import os
import sys
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Throttling imports
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_ipaddr
import redis.asyncio as redis

# Import logger
from logger import logger

# Add 'src' directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
src_path = os.path.join(current_dir, 'src')
if src_path not in sys.path:
    sys.path.insert(0, src_path)

from src.socialbloggingcrew.crew import SocialBloggingApp

# Initialize FastAPI app
app = FastAPI(title="Social Blogging API", version="1.0")
logger.info("Social Blogging API starting up...")

# Rate limiter setup: 5 requests per minute per IP
limiter = Limiter(key_func=get_ipaddr, default_limits=["5/minute"])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class BlogRequest(BaseModel):
    topic: str

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the Social Blogging API"}

def parse_crew_output_json(raw_result_string: str) -> dict:
    logger.info("Cleaning and parsing crew output...")

    cleaned = raw_result_string.strip()

    # Remove markdown fencing if present
    if cleaned.startswith("```json"):
        cleaned = cleaned[len("```json"):].strip()
    if cleaned.endswith("```"):
        cleaned = cleaned.rsplit("```", 1)[0].strip()

    logger.info(f"Cleaned result string: {cleaned}")

    try:
        parsed = json.loads(cleaned)
        if not isinstance(parsed, dict):
            raise ValueError("Parsed result is not a JSON object.")
        return parsed
    except json.JSONDecodeError as e:
        logger.error(f"JSON decoding failed: {e}")
        logger.error(f"Invalid JSON string: {cleaned}")
        raise HTTPException(status_code=500, detail="Invalid JSON format from crew output.")
    except Exception as e:
        logger.error(f"Unexpected error while parsing JSON: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-blog")
def generate_blog(request: BlogRequest):
    logger.info(f"Blog generation requested for topic: '{request.topic}'")

    if not request.topic.strip():
        logger.warning("Empty topic provided")
        raise HTTPException(status_code=400, detail="Topic cannot be empty")

    inputs = {
        "blog_topic": request.topic,
        "current_year": str(datetime.now().year),
        "platform_guidelines": "Follow our standard editorial guidelines for clarity, tone, and style."
    }

    try:
        logger.info("Starting crew execution...")
        crew_app = SocialBloggingApp()
        result = crew_app.crew().kickoff(inputs=inputs)
        logger.info("Crew execution completed successfully")

        if not hasattr(result, 'raw'):
            raise ValueError("Missing 'raw' attribute in crew output.")

        raw_result = result.raw
        logger.info(f"Raw crew output: {raw_result}")

        parsed_result = parse_crew_output_json(raw_result)

        # Extract blog metadata
        title = (parsed_result.get("title") or 
                 parsed_result.get("blogTitle") or 
                 parsed_result.get("blog_title") or 
                 f"Top {request.topic.title()} Insights and Trends")

        content = (parsed_result.get("summary") or 
                   parsed_result.get("blog_summary") or 
                   parsed_result.get("blogSummary") or 
                   parsed_result.get("content") or 
                   "No content was generated.")

        meta_description = (parsed_result.get("meta_description") or 
                            parsed_result.get("metaDescription") or 
                            parsed_result.get("meta_desc") or 
                            f"A comprehensive guide about {request.topic}.")

        social_media_posts = parsed_result.get("social_media_posts", {})

        # Extract hashtags
        hashtags = set()
        if isinstance(social_media_posts, dict):
            for platform, post in social_media_posts.items():
                if isinstance(post, str):
                    for word in post.split():
                        if word.startswith('#'):
                            hashtag = word.strip('#.,!?()').lower()
                            if hashtag:
                                hashtags.add(hashtag)

        hashtags_list = list(hashtags) if hashtags else [request.topic.lower().replace(" ", "")]

        final_output = {
            "title": title,
            "content": content,
            "meta_description": meta_description,
            "social_media_posts": social_media_posts,
            "hashtags": hashtags_list
        }

        logger.info(f"Blog generated successfully: {title}")
        return final_output

    except Exception as e:
        logger.error(f"Blog generation failed: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the blog.")

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Social Blogging API server...")
    uvicorn.run(app, host="0.0.0.0", port=5000)

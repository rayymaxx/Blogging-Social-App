import os
import sys
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

#throttling imports
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

from src.social_blogging_app.crew import SocialBloggingApp

# Initialize FastAPI app
app = FastAPI(title="Social Blogging API", version="1.0")
logger.info("Social Blogging API starting up...")

# I am setting a limit of 5 requests per minute, per IP address.
limiter = Limiter(key_func=get_ipaddr, default_limits=["5/minute"])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Added CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic input model
class BlogRequest(BaseModel):
    topic: str

# Root endpoint
@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the Social Blogging API"}

#  generate_blog function
@app.post("/api/generate-blog")
def generate_blog(request: BlogRequest):
    logger.info(f"Blog generation requested for topic: '{request.topic}'")
    
    if not request.topic.strip():
        logger.warning("Empty topic provided")
        raise HTTPException(status_code=400, detail="Topic cannot be empty")

    # Preparing crew inputs
    inputs = {
        "blog_topic": request.topic,
        "current_year": str(datetime.now().year),
        "platform_guidelines": "Follow our standard editorial guidelines for clarity, tone, and style."
    }

    try:
        logger.info("Starting crew execution...")
        # Initializing and run crew
        crew_app = SocialBloggingApp()
        result = crew_app.crew().kickoff(inputs=inputs)
        logger.info("Crew execution completed successfully")

        # Handles the CrewOutput object and parse its raw string attribute.
        raw_result_string = ""
        if hasattr(result, 'raw'):
            raw_result_string = result.raw
        else:
            raise ValueError(f"Unexpected crew result format: {type(result)}. The output is missing the 'raw' attribute.")

        # DEBUG: Log the raw result
        logger.info(f"Raw crew output: {raw_result_string}")

        # Cleaning and parse the JSON string from the raw attribute
        cleaned_result_string = raw_result_string.strip()
        # Remove any trailing markdown code block tags if they exist
        if cleaned_result_string.startswith("```json"):
            cleaned_result_string = cleaned_result_string.replace("```json", "").strip()
        if cleaned_result_string.endswith("```"):
            cleaned_result_string = cleaned_result_string.rsplit("```", 1)[0].strip()

        # DEBUG: Log the cleaned result
        logger.info(f"Cleaned result string: {cleaned_result_string}")

        parsed_result = json.loads(cleaned_result_string)

        # DEBUG: Log the parsed JSON structure
        logger.info(f"Parsed JSON keys: {list(parsed_result.keys())}")
        logger.info(f"Full parsed result: {json.dumps(parsed_result, indent=2)}")

        # Extract title - try multiple possible keys
        title = (parsed_result.get("title") or 
                parsed_result.get("blogTitle") or 
                parsed_result.get("blog_title") or
                f"Top {request.topic.title()} Insights and Trends")
        
        # Get the main content - try multiple possible keys
        blog_content = (parsed_result.get("summary") or 
                       parsed_result.get("blog_summary") or 
                       parsed_result.get("blogSummary") or 
                       parsed_result.get("content") or
                       "No content was generated.")
        
        # Get meta description
        meta_description = (parsed_result.get("meta_description") or 
                           parsed_result.get("metaDescription") or 
                           parsed_result.get("meta_desc") or
                           f"A comprehensive guide about {request.topic}.")
        
        # Extract social media posts
        social_media_posts = parsed_result.get("social_media_posts", {})
        
        # DEBUG: Log social media posts
        logger.info(f"Social media posts found: {social_media_posts}")
        logger.info(f"Social media posts type: {type(social_media_posts)}")
        
        # Extract hashtags from all social media posts
        hashtags = set()  # Using set to avoid duplicates
        
        if isinstance(social_media_posts, dict):
            for platform, post in social_media_posts.items():
                logger.info(f"Processing {platform}: {post}")
                # Extract hashtags from each social media post
                if isinstance(post, str):
                    words = post.split()
                    for word in words:
                        if word.startswith('#'):
                            hashtag = word.strip('#').strip('.,!?()').lower()
                            if hashtag:  # Only add non-empty hashtags
                                hashtags.add(hashtag)
                                logger.info(f"Found hashtag: {hashtag}")
        
        # Convert set back to list and add fallback if no hashtags found
        hashtags_list = list(hashtags) if hashtags else [request.topic.lower().replace(' ', '')]
        
        # DEBUG: Log final hashtags
        logger.info(f"Final hashtags: {hashtags_list}")
        
        # Preparing the final, comprehensive output
        final_output = {
            "title": title,
            "content": blog_content,
            "meta_description": meta_description,
            "social_media_posts": social_media_posts,  
            "hashtags": hashtags_list
        }

        # DEBUG: Log final output
        logger.info(f"Final output: {json.dumps(final_output, indent=2)}")

        logger.info(f"Blog generation successful - Title: '{title}'")
        return final_output

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse crew output as JSON: {e}")
        logger.error(f"Raw string that failed to parse: {raw_result_string}")
        raise HTTPException(status_code=500, detail=f"An error occurred: The crew's output was not valid JSON.")
    except Exception as e:
        logger.error(f"Blog generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred while generating the blog: {str(e)}")

# Running with uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting Social Blogging API server...")
    uvicorn.run(app, host="0.0.0.0", port=5000)
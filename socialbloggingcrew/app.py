import os
import traceback
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List

# Corrected import to reflect the nested directory structure
from socialbloggingcrew.src.socialbloggingcrew.crew import Socialbloggingcrew
from socialbloggingcrew.src.socialbloggingcrew.db import save_blog, load_blogs

# Load environment variables from a .env file
load_dotenv()

# Define the FastAPI app
app = FastAPI(
    title="AI Content Generation API",
    description="A multi-agent system to generate social media blog posts.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing) to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Pydantic model for the request body to generate a blog post
class BlogRequest(BaseModel):
    topic: str
    tone: str = "professional"  # Default value for the tone
    platform: str = "general"   # Default value for the platform

@app.get("/")
async def read_root():
    """
    Root endpoint to verify the API is running.
    """
    return {"message": "Welcome to the AI Content Generation API!"}

@app.post("/api/generate-blog")
async def generate_blog_post(request: BlogRequest):
    """
    Endpoint to trigger the multi-agent crew to generate a social media blog post.
    """
    try:
        # Instantiate the crew
        crew = Socialbloggingcrew().create_crew()

        # Create the input dictionary for the crew's kickoff method
        inputs = {
            'topic': request.topic,
            'tone': request.tone,
            'platform': request.platform,
            'current_year': str(datetime.now().year)
        }
        
        # Run the crew and get the final result
        result = crew.kickoff(inputs=inputs)
        
        # Save the generated content to a JSON file
        save_blog({'topic': request.topic, 'content': result})
        
        # Return the generated content as a JSON response
        return {"result": result}
        
    except Exception as e:
        # Catch any exception, print the full traceback for debugging,
        # and return a 500 status code with an error message
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"detail": f"An internal server error occurred: {str(e)}"}
        )

@app.get("/api/blogs")
async def get_all_blogs():
    """
    Endpoint to retrieve all saved blog posts from the JSON file.
    """
    try:
        # Load all blogs from the database file
        blogs = load_blogs()
        return {"blogs": blogs}
    except Exception as e:
        # Catch any exception, print the full traceback for debugging,
        # and return a 500 status code with an error message
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"detail": f"An internal server error occurred: {str(e)}"}
        )

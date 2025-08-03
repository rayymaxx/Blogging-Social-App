import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any

from socialbloggingcrew.crew import Socialbloggingcrew

# Load environment variables
load_dotenv()

# Define the FastAPI app
app = FastAPI(
    title="AI Content Generation API",
    description="A multi-agent system to generate social media blog posts.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request body
class BlogRequest(BaseModel):
    topic: str
    tone: str = "professional"  # Default value
    platform: str = "general"   # Default value

@app.get("/")
async def read_root():
    return {"message": "Welcome to the AI Content Generation API!"}

@app.post("/api/generate-blog")
async def generate_blog_post(request: BlogRequest):
    try:
        crew_instance = Socialbloggingcrew().create_crew()
        
        # Pass the topic from the request to the crew
        result = crew_instance.kickoff(inputs={'topic': request.topic})
        
        # For simplicity, we'll return the raw output from the crew.
        # In a real-world app, you'd parse this into a structured JSON response.
        return {"result": result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
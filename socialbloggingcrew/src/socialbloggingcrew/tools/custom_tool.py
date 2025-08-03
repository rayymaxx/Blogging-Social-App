import os
from crewai_tools import SerperDevTool

# Get the API key from the environment variable
os.environ['SERPER_API_KEY'] = os.getenv("SERPER_API_KEY")

# Initialize the SerperDevTool
def get_search_tool():
    return SerperDevTool()
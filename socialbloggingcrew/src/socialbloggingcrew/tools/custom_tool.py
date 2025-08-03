import os
from crewai_tools import SerperDevTool, RagTool
from socialbloggingcrew.rag import get_rag_tool
from dotenv import load_dotenv

# We should load dotenv here as well to be safe
load_dotenv()

def get_search_tool():
    """Returns a SerperDevTool instance with a valid API key."""
    serper_api_key = os.getenv("SERPER_API_KEY")
    if not serper_api_key:
        raise ValueError("SERPER_API_KEY is not set in the environment variables.")
    
    os.environ['SERPER_API_KEY'] = serper_api_key
    return SerperDevTool()

def get_internal_knowledge_tool():
    """Returns a RagTool instance with the internal knowledge base retriever."""
    # This function will call your get_rag_tool() and wrap it in a RagTool
    retriever = get_rag_tool()
    return RagTool(retriever=retriever)
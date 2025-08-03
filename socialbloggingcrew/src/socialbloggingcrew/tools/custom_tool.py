from langchain_google_genai import ChatGoogleGenerativeAI
from crewai_tools import SerperDevTool, RagTool
import os
from dotenv import load_dotenv

# CORRECTED: The import now references the correct function name.
from socialbloggingcrew.rag import get_vector_db

# Load environment variables from .env
load_dotenv()

# Instantiate the Gemini LLM
gemini_llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash-latest",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def get_search_tool():
    """
    Returns a search tool using the SERPER_API_KEY.
    """
    return SerperDevTool()

def get_internal_knowledge_tool():
    """
    Returns a RAG tool initialized with a ChromaDB retriever and the Gemini LLM.
    """
    # CORRECTED: This now calls the correct function name.
    vector_db = get_vector_db()

    # Ensure the vector database was created successfully
    if vector_db:
        # Get the retriever instance from the vector database
        retriever = vector_db.as_retriever()
        
        # Instantiate the RagTool with the retriever and the Gemini LLM
        return RagTool(retriever=retriever, llm=gemini_llm)
    else:
        # If the database creation failed, return None to prevent a crash
        print("WARNING: RAG Tool could not be initialized. Internal knowledge will not be used.")
        return None

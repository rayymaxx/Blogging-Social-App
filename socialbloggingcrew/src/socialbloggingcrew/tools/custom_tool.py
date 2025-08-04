from crewai.tools import BaseTool
from typing import Type, Any
from pydantic import BaseModel, Field

# Importing  my RAG utilities
from .rag_utils import setup_rag_pipeline, get_context_from_query

# Loading  ChromaDB at import time
db = setup_rag_pipeline()

# Defining the input schema for the tool
class KnowledgeBaseSearchInput(BaseModel):
    """Inputs for searching the Knowledge Base."""
    # Allowiing any type so validation won't fail before _run() executes
    query: Any = Field(..., description="The search query to look up in the knowledge base.")

class KnowledgeBaseSearchTool(BaseTool):
    name: str = "Knowledge Base Search"
    description: str = (
        "Searches the Knowledge Base for relevant information using semantic similarity search."
    )
    args_schema: Type[BaseModel] = KnowledgeBaseSearchInput

    def _run(self, query: Any) -> str:
        """Run the search on the Knowledge Base."""
        try:
            # Handle dictionary input by extracting description if present
            if isinstance(query, dict):
                if "description" in query:
                    query = query["description"]
                else:
                    query = str(query)

            # Ensuring that query is a string
            if not isinstance(query, str):
                return "Error: query must be a string."

            # Performing the search
            context_chunks = get_context_from_query(query, db)
            return "\n\n".join(context_chunks) if context_chunks else "No relevant information found."

        except Exception as e:
            return f"Error searching Knowledge Base: {str(e)}"

    async def _arun(self, query: Any) -> str:
        """Async version (not implemented)."""
        raise NotImplementedError("Async search not implemented.")

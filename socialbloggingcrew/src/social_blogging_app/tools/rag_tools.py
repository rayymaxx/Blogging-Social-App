from .rag_utils import setup_rag_pipeline
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RAGTools:
    def __init__(self):
        self._db = None
        
    @property
    def db(self):
        if self._db is None:
            try:
                logger.info("Initializing RAG database...")
                self._db = setup_rag_pipeline()
                logger.info("RAG database initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize RAG database: {str(e)}")
                return None
        return self._db
    
    def search_knowledge_base(self, query: str) -> str:
        """
        Search through ingested documents to find relevant information.
        
        Args:
            query (str): The search query to find relevant information
            
        Returns:
            str: Retrieved information from the knowledge base
        """
        try:
            logger.info(f"Executing RAG search with query: {query}")
            
            # Check if db is available
            if self.db is None:
                return "Error: RAG database is not available"
            
            # Performing similarity search
            docs = self.db.similarity_search(query, k=3)
            logger.info(f"Found {len(docs)} relevant documents")
            
            if not docs:
                return "No relevant information found in the knowledge base."
            
            # Combining the retrieved documents
            combined_text = "\n\n".join([doc.page_content for doc in docs])
            result = f"Retrieved information from knowledge base:\n{combined_text}"
            logger.info("RAG search completed successfully")
            return result
            
        except Exception as e:
            error_msg = f"Error during RAG search: {str(e)}"
            logger.error(error_msg)
            return error_msg
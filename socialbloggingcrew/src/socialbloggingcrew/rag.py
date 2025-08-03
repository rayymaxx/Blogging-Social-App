import os
import chromadb
from dotenv import load_dotenv
from langchain_community.vectorstores.chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
# CORRECTED IMPORT: We will now use the Hugging Face Inference API
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

# Load environment variables. IMPORTANT: Your HUGGINGFACEHUB_API_TOKEN must be set
# in your .env file for this to work.
load_dotenv()

# Define the directory for the knowledge base
ABS_PATH = os.path.dirname(os.path.abspath(__file__))
PDF_PATH = os.path.join(ABS_PATH, "knowledge_base.pdf")
DB_DIR = os.path.join(ABS_PATH, "db")

# Function to create or load the vector database
def get_vector_db():
    """
    Creates and returns a ChromaDB instance loaded with content from a PDF file.
    
    This function now uses the Hugging Face Inference API for embeddings,
    meaning the model is not run locally. You must have a Hugging Face
    API token configured as an environment variable.
    """
    try:
        # Load the PDF document
        loader = PyPDFLoader(PDF_PATH)
        documents = loader.load()

        # Split the document into smaller, manageable chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = text_splitter.split_documents(documents)
        
        # Use Hugging Face Inference API for embeddings
        # The API key is retrieved from the environment variables
        embedding_function = HuggingFaceInferenceAPIEmbeddings(
            api_key=os.environ["HUGGINGFACEHUB_API_TOKEN"],
            model_name="sentence-transformers/all-MiniLM-L6-v2"  # A popular, fast embedding model
        )
        
        # Create a new ChromaDB instance with the documents and the embedding function.
        # This is an in-memory database and will not be persisted to disk.
        vector_db = Chroma.from_documents(
            documents=docs,
            embedding=embedding_function
        )
        
        print("INFO: Vector database created in memory using Hugging Face Inference API.")
        
        return vector_db

    except Exception as e:
        print(f"ERROR: Failed to initialize or load vector database: {e}")
        return None

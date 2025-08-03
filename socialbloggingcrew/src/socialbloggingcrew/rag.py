import os
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Define the paths to our knowledge base
DOCUMENTS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../knowledge')
CHROMA_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../chroma_db')

def get_rag_tool():
    """
    Loads documents, creates a vector store, and returns a Retriever.
    """
    # 1. Load documents from the 'knowledge' directory
    loader = DirectoryLoader(DOCUMENTS_PATH, glob="**/*.txt")
    documents = loader.load()
    
    # 2. Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    
    # 3. Use the HuggingFace API for embeddings
    hf_api_key = os.getenv("HUGGINGFACEHUB_API_TOKEN")
    if not hf_api_key:
        raise ValueError("HUGGINGFACEHUB_API_TOKEN is not set in environment variables.")

    # You can choose a different model if you prefer
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    
    # 4. Create and persist the ChromaDB vector store
    vector_db = Chroma.from_documents(
        documents=texts, 
        embedding=embeddings, 
        persist_directory=CHROMA_DB_PATH
    )
    vector_db.persist()
    
    # 5. Return a retriever instance for querying
    return vector_db.as_retriever()
    
if __name__ == '__main__':
    retriever = get_rag_tool()
    query = "What is the policy on brand voice?"
    docs = retriever.invoke(query)
    print("Retrieved documents:")
    for doc in docs:
        print(f"Content: {doc.page_content}\nSource: {doc.metadata['source']}")
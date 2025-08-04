import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
KNOWLEDGE_BASE_PATH = os.path.join(BASE_DIR, "knowledge_base")
CHROMA_DB_PATH = os.path.join(BASE_DIR, "chroma_db_store")


def setup_rag_pipeline():
    """
    Loads or creates a ChromaDB vector store from Markdown files in the knowledge base.
    """
    if os.path.exists(CHROMA_DB_PATH):
        print(" Vector store already exists. Loading from disk...")
        db = Chroma(
            persist_directory=CHROMA_DB_PATH,
            embedding_function=SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        )
        return db

    print("📥 No vector store found. Starting ingestion...")

    loader = DirectoryLoader(
        KNOWLEDGE_BASE_PATH,
        glob="**/*.md",
        loader_cls=lambda path: TextLoader(path, encoding="utf-8"),
        recursive=True
    )

    documents = loader.load()

    # Splitting documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)

    # Creating embeddings
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

    # Storing in ChromaDB
    db = Chroma.from_documents(chunks, embedding_function, persist_directory=CHROMA_DB_PATH)
    db.persist()

    print(f"✅ Ingestion complete. {len(chunks)} chunks embedded and stored in {CHROMA_DB_PATH}.")
    return db
def get_context_from_query(query: str, db, k: int = 3) -> list:
    """
    Searches the ChromaDB vector store for relevant document chunks matching the query.

    Args:
        query (str): The search query.
        db: The Chroma vector store instance.
        k (int): Number of top similar documents to return.

    Returns:
        list: List of document page contents.
    """
    results = db.similarity_search(query, k=k)
    return [doc.page_content for doc in results]

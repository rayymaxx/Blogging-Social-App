from social_blogging_app.src.social_blogging_app.tools.rag_utils import setup_rag_pipeline, get_context_from_query

if __name__ == "__main__":
    #  loading the vector store
    db = setup_rag_pipeline()

    # Example query
    query = "How can AI be used in smart homes?"
    context = get_context_from_query(query, db, k=3)

    print("\n🔍 Top matching context chunks:\n")
    for i, chunk in enumerate(context, 1):
        print(f"--- Result {i} ---")
        print(chunk)
        print()

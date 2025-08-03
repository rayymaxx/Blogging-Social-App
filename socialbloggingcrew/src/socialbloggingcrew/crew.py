import os
from dotenv import load_dotenv
from crewai import Agent, Crew, Task, Process
from langchain_community.tools import tool
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import ChatGoogleGenerativeAI
# Corrected imports to use absolute paths from the package root
from socialbloggingcrew.rag import get_vector_db
from socialbloggingcrew.src.socialbloggingcrew.tools.custom_tool import get_search_tool, get_internal_knowledge_tool
import yaml

# Load agent and task configurations from YAML files
# Corrected config path to handle the new directory structure
config_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config')
with open(os.path.join(config_dir, 'agents.yaml'), 'r') as file:
    agents_config = yaml.safe_load(file)
with open(os.path.join(config_dir, 'tasks.yaml'), 'r') as file:
    tasks_config = yaml.safe_load(file)

@tool
def load_and_create_vector_store(directory_path: str) -> str:
    """
    Loads documents from a specified directory, splits them into chunks,
    and creates a vector store. This is used to ingest internal knowledge
    for the agents to reference.

    Args:
        directory_path (str): The path to the directory containing knowledge files.
    """
    try:
        loader = DirectoryLoader(directory_path, glob='**/*.txt')
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(docs)
        # This part of the code is not used as the RAG tool is imported from custom_tool.py, but it's kept for reference.
        print("Documents loaded and split into chunks.")
        return "Vector store created."
    except Exception as e:
        return f"ERROR: Failed to load documents: {e}"

class Socialbloggingcrew:
    def __init__(self):
        # Load environment variables from a .env file
        load_dotenv()
        self.agents_config = agents_config
        self.tasks_config = tasks_config
        self.gemini_llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", google_api_key=os.getenv("GOOGLE_API_KEY"))

    def create_agents(self):
        """
        Create and return agents with their respective roles and goals.
        The LLM is now passed directly to each agent.
        """
        search_tool = get_search_tool()
        rag_tool = get_internal_knowledge_tool()

        trend_hunter_agent = Agent(
            role=self.agents_config['trend_hunter']['role'],
            goal=self.agents_config['trend_hunter']['goal'],
            backstory=self.agents_config['trend_hunter']['backstory'],
            llm=self.gemini_llm,  # Pass the instantiated LLM directly
            tools=[search_tool],
            verbose=self.agents_config['trend_hunter']['verbose'],
            allow_delegation=self.agents_config['trend_hunter']['allow_delegation']
        )

        writer_agent = Agent(
            role=self.agents_config['writer']['role'],
            goal=self.agents_config['writer']['goal'],
            backstory=self.agents_config['writer']['backstory'],
            llm=self.gemini_llm,  # Pass the instantiated LLM directly
            tools=[rag_tool],
            verbose=self.agents_config['writer']['verbose'],
            allow_delegation=self.agents_config['writer']['allow_delegation']
        )

        editor_agent = Agent(
            role=self.agents_config['editor']['role'],
            goal=self.agents_config['editor']['goal'],
            backstory=self.agents_config['editor']['backstory'],
            llm=self.gemini_llm,  # Pass the instantiated LLM directly
            tools=[load_and_create_vector_store],
            verbose=self.agents_config['editor']['verbose'],
            allow_delegation=self.agents_config['editor']['allow_delegation']
        )

        summarizer_agent = Agent(
            role=self.agents_config['summarizer']['role'],
            goal=self.agents_config['summarizer']['goal'],
            backstory=self.agents_config['summarizer']['backstory'],
            llm=self.gemini_llm,  # Pass the instantiated LLM directly
            verbose=self.agents_config['summarizer']['verbose'],
            allow_delegation=self.agents_config['summarizer']['allow_delegation']
        )
        return trend_hunter_agent, writer_agent, editor_agent, summarizer_agent

    def create_tasks(self, trend_hunter_agent, writer_agent, editor_agent, summarizer_agent):
        """
        Create and return tasks with context and agents.
        """
        research_task = Task(
            config=self.tasks_config['research_task'],
            agent=trend_hunter_agent
        )

        writing_task = Task(
            config=self.tasks_config['writing_task'],
            agent=writer_agent,
            context=[research_task]
        )

        editing_task = Task(
            config=self.tasks_config['editing_task'],
            agent=editor_agent,
            context=[writing_task]
        )

        summarizing_task = Task(
            config=self.tasks_config['summarizing_task'],
            agent=summarizer_agent,
            context=[editing_task]
        )

        return [research_task, writing_task, editing_task, summarizing_task]

    def create_crew(self):
        """
        Create and return a Crew instance with all agents and tasks.
        """
        trend_hunter_agent, writer_agent, editor_agent, summarizer_agent = self.create_agents()
        tasks = self.create_tasks(trend_hunter_agent, writer_agent, editor_agent, summarizer_agent)

        return Crew(
            agents=[
                trend_hunter_agent,
                writer_agent,
                editor_agent,
                summarizer_agent
            ],
            tasks=tasks,
            process=Process.sequential,
            verbose=True
        )

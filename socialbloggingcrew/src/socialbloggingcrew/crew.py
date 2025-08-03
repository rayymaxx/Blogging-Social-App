import os
from dotenv import load_dotenv
from crewai import Agent, Crew, Task, Process

# --> UPDATED IMPORT: We need to import the internal knowledge tool as well
from socialbloggingcrew.tools.custom_tool import get_search_tool, get_internal_knowledge_tool
from socialbloggingcrew.config.agents import agents_config
from socialbloggingcrew.config.tasks import tasks_config

# Load environment variables
load_dotenv()

class Socialbloggingcrew:
    def __init__(self):
        self.agents_config = agents_config
        self.tasks_config = tasks_config

    def create_agents(self):
        # The TrendHunterAgent needs the search tool
        search_tool = get_search_tool()
        
        # --> NEW: Get the internal knowledge tool
        rag_tool = get_internal_knowledge_tool()

        trend_hunter_agent = Agent(
            config=self.agents_config['trend_hunter'],
            tools=[search_tool]
        )

        # --> UPDATED AGENT: Assign the RAG tool to the writer
        writer_agent = Agent(
            config=self.agents_config['writer'],
            tools=[rag_tool]
        )
        
        editor_agent = Agent(
            config=self.agents_config['editor']
        )

        summarizer_agent = Agent(
            config=self.agents_config['summarizer']
        )
        
        return trend_hunter_agent, writer_agent, editor_agent, summarizer_agent

    def create_tasks(self, trend_hunter_agent, writer_agent, editor_agent, summarizer_agent):
        # We define tasks with the agent and context from previous tasks
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
            process=Process.sequential,  # This ensures tasks run one after the other
            verbose=True
        )
import os
from crewai_tools import SerperDevTool

class SearchTools:
    """A tool for searching the internet."""

    def get_google_search_tool(self):
        return SerperDevTool()
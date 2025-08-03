#!/usr/bin/env python
import sys
import warnings
from datetime import datetime

from socialbloggingcrew.crew import Socialbloggingcrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

def run():
    """
    Run the crew locally.
    """
    inputs = {
        'topic': 'Latest trends in AI and machine learning for content creators',
        'current_year': str(datetime.now().year)
    }

    try:
        crew_instance = Socialbloggingcrew().create_crew()
        result = crew_instance.kickoff(inputs=inputs)
        print("\n\n########################")
        print("## Final Blog Post ##")
        print("########################\n")
        print(result)

    except Exception as e:
        print(f"An error occurred while running the crew: {e}")

if __name__ == "__main__":
    run()
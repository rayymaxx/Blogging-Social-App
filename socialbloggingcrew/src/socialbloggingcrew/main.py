import warnings
from datetime import datetime
import json
from .crew import SocialBloggingApp  # Ensure correct relative path

def get_user_inputs():
    print("## Blog Content Generation Crew")
    print('-------------------------------')
    topic = input("Enter the blog topic: ").strip()
    return {
        'blog_topic': topic,
        'current_year': str(datetime.now().year),
        'platform_guidelines': 'Follow editorial guidelines for clarity, tone, and style.'
    }

def run_crew():
    """
    Runs the content generation crew with user inputs.
    """
    inputs = get_user_inputs()
    crew_app = SocialBloggingApp()

    result = crew_app.crew().kickoff(inputs=inputs)
    
    print("\n\n########################")
    print("## Final Blog Output:")
    print("########################\n")

    try:
        json_result = json.loads(result.raw)
        print(json.dumps(json_result, indent=2))
    except json.JSONDecodeError:
        print("Output was not valid JSON. Raw output:\n")
        print(result)

if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")
    run_crew()

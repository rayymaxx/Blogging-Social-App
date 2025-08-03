import json
import os
from typing import List, Dict, Any

JSON_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../blogs.json')

def load_blogs() -> List[Dict[str, Any]]:
    """Loads all blog posts from the JSON file."""
    if not os.path.exists(JSON_FILE_PATH):
        return []
    with open(JSON_FILE_PATH, 'r') as file:
        return json.load(file)

def save_blog(blog_post: Dict[str, Any]):
    """Appends a new blog post to the JSON file."""
    blogs = load_blogs()
    blogs.append(blog_post)
    with open(JSON_FILE_PATH, 'w') as file:
        json.dump(blogs, file, indent=4)
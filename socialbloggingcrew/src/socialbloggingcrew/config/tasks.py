import yaml
import os

config_path = os.path.join(os.path.dirname(__file__), 'tasks.yaml')
with open(config_path, 'r') as file:
    tasks_config = yaml.safe_load(file)
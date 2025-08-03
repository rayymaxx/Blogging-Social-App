import yaml
import os

config_path = os.path.join(os.path.dirname(__file__), 'agents.yaml')
with open(config_path, 'r') as file:
    agents_config = yaml.safe_load(file)
import yaml
import os

# Get the directory of this file
config_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the full path to the agents.yaml file
yaml_path = os.path.join(config_dir, 'agents.yaml')

# A variable to hold the loaded configuration
agents_config = {}

# Check if the file exists and load it
if os.path.exists(yaml_path):
    with open(yaml_path, 'r') as file:
        agents_config = yaml.safe_load(file)
else:
    print(f"Warning: agents.yaml not found at {yaml_path}. Falling back to an empty configuration.")
import yaml
from yaml.loader import SafeLoader

with open("data.yaml", "r") as f:
	data = yaml.load(f, Loader=SafeLoader)

for key, value in data.items():
	print(key, value)

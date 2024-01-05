import os
import json

# Define the root directory and the specific directories to traverse
root_dir = './'
specific_dirs = ['es', 'vi', 'fr', 'pl', 'ru']

# Traverse through the specific directories
for dirpath, dirnames, filenames in os.walk(root_dir):
 if any(dir in dirpath for dir in specific_dirs):
     # Initialize an empty dictionary to store the contents of the JSON files
     all_data = {}

     for filename in filenames:
         if filename.endswith('.json'):
             with open(os.path.join(dirpath, filename), 'r') as f:
                data = json.load(f)
                if isinstance(data, list):
                  for item in data:
                      if isinstance(item, dict):
                          all_data.update(item)
                else:
                  all_data.update(data)

     # Write all_data to a new file named all.json in the current directory
     with open(os.path.join(dirpath, 'all.json'), 'w') as f:
        json.dump(all_data, f)

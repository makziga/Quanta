import json
import os
import requests
from typing import List, Dict
import re
from config import GITHUB_REPO_URL

def get_github_raw_url(file_path: str) -> str:
    owner, repo = GITHUB_REPO_URL.split('/')[-2:]
    return f"https://raw.githubusercontent.com/{owner}/{repo}/main/{file_path}"

def fetch_file_content(file_path: str) -> str:
    url = get_github_raw_url(file_path)
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print(f"Failed to fetch content for {file_path}")
        return ""

def extract_imports(content: str) -> List[str]:
    import_patterns = [
        r'(?:import|from)\s+(?:{[^}]*}|\w+)\s+from\s+[\'"]([^\'"]+)[\'"]',
        r'from\s+(\w+)\s+import',
    ]
    imports = []
    for pattern in import_patterns:
        imports.extend(re.findall(pattern, content))
    return imports

def find_related_files(imports: List[str], github_structure: List[str], main_file: str) -> List[str]:
    related_files = []
    main_file_dir = os.path.dirname(main_file)

    for imp in imports:
        # Remove leading '@/' or './'
        imp = re.sub(r'^[@./]+', '', imp)
        
        # Split the import path
        path_parts = imp.split('/')
        
        # For Python imports, use the main file's directory
        if len(path_parts) == 1:
            imp = os.path.join(main_file_dir, imp)
            path_parts = imp.split('/')

        matched_files = []
        for file in github_structure:
            file_parts = file.split('/')
            if len(file_parts) >= len(path_parts):
                # Compare parts from right to left, ignoring file extensions
                if all(fp.split('.')[0] == pp for fp, pp in zip(reversed(file_parts), reversed(path_parts))):
                    matched_files.append(file)

        related_files.extend(matched_files)

    # Remove duplicates and the main file itself
    related_files = list(set(related_files) - {main_file})
    return related_files

def extract_related_files():
    # Read main files
    with open("outputs/0002-Main_files.txt", "r") as f:
        main_files_data = json.load(f)
    
    # Read GitHub structure
    with open("outputs/0001-Github_structure.txt", "r") as f:
        github_structure = f.read().splitlines()
    
    component_structure = []
    
    for main_file in main_files_data["mainFiles"]:
        content = fetch_file_content(main_file)
        imports = extract_imports(content)
        related_files = find_related_files(imports, github_structure, main_file)
        
        component_structure.append({
            "mainFile": main_file,
            "components": related_files
        })
    
    # Create the output
    output = {
        "componentStructure": component_structure
    }
    
    # Write the output to a file
    with open("outputs/0003-Related_files.txt", "w") as f:
        json.dump(output, f, indent=2)
    
    # Return the output
    return output

if __name__ == "__main__":
    result = extract_related_files()
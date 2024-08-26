import requests
import os

def extract_github_structure(repo_url, output_file):
    owner, repo = repo_url.split('/')[-2:]
    api_url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1"
    
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        tree = data.get('tree', [])
        
        structure = []
        for item in tree:
            path = item['path']
            if not should_ignore(path):
                structure.append(path)
        
        with open(output_file, 'w') as f:
            for item in sorted(structure):
                f.write(f"{item}\n")
    else:
        print(f"Failed to fetch repository structure. Status code: {response.status_code}")

def should_ignore(path):
    ignore_extensions = [
        '.json', '.env', '.config', '.lock', '.pyc', '.txt', '.pyd', '.pyi', '.ps1',
        '.png', '.jpg', '.jpeg', '.gif', '.ttf', '.woff', '.woff2', '.eot', '.svg',
    ]
    ignore_files = [
        'package-lock.json', 'INSTALLER', 'LICENSE', '.gitignore', '.env' 
    ]
    ignore_folders = ['venv', 'lib']
    
    path_parts = path.split('/')
    file_name = path_parts[-1]
    _, ext = os.path.splitext(file_name)
    
    # Check if any part of the path is in ignore_folders
    if any(folder in path_parts for folder in ignore_folders):
        return True
    
    # Check file extensions
    if ext.lower() in ignore_extensions:
        return True
    
    # Check specific file names
    if file_name.lower() in ignore_files:
        return True
    
    # Check for files without extensions (like INSTALLER, LICENSE)
    if '.' not in file_name and not os.path.isdir(path):
        return True
    
    return False
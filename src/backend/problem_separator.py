import os
import json
import requests
from config import GITHUB_REPO_URL

def get_cleaned_code(owner, repo, file_path):
    url = f"https://raw.githubusercontent.com/{owner}/{repo}/main/{file_path}"
    response = requests.get(url)
    if response.status_code == 200:
        code = response.text
        cleaned_code = remove_imports_and_styles(code)
        return cleaned_code
    else:
        return f"Error: Unable to fetch code for {file_path}"

def remove_imports_and_styles(code):
    lines = code.split('\n')
    cleaned_lines = []
    in_styles = False
    
    for line in lines:
        if line.strip().startswith(('import ', 'from ')):
            continue
        if line.strip().startswith('const styles'):
            in_styles = True
            continue
        if in_styles:
            if line.strip().endswith('});'):
                in_styles = False
            continue
        cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)

def separate_problems(problem_json):
    owner, repo = GITHUB_REPO_URL.split('/')[-2:]
    
    if not os.path.exists("Separated Problems"):
        os.makedirs("Separated Problems")
    
    for result in problem_json["analysisResults"]:
        main_file = result["mainFile"]
        for issue in result["issues"]:
            title = issue["title"]
            details = issue.get("details", issue["description"])
            file_name = f"{main_file.replace('/', '-')}-{title.replace(' ', '_')}.txt"
            
            content = f"Title of the problem is: {title}. Here is the description of the problem: {details}\n"
            content += "And here are the codes where this problem is appearing:\n"
            
            for file in issue["fileNames"]:
                code = get_cleaned_code(owner, repo, file)
                content += f"{file}:\n{code}\n\n"
            
            with open(os.path.join("Separated Problems", file_name), 'w', encoding='utf-8') as f:
                f.write(content)

def process_problem_files():
    if not os.path.exists("Problems"):
        print("No Problems folder found.")
        return
    
    for filename in os.listdir("Problems"):
        if filename.endswith("_problem.txt"):
            with open(os.path.join("Problems", filename), 'r', encoding='utf-8') as f:
                problem_json = json.loads(f.read())
            separate_problems(problem_json)

if __name__ == "__main__":
    process_problem_files()
import os
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from config import GITHUB_REPO_URL

def generate_structured_inputs(component_structure):
    owner, repo = GITHUB_REPO_URL.split('/')[-2:]
    
    if not os.path.exists("AI_first_input"):
        os.makedirs("AI_first_input")
    
    all_inputs = {}
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_file = {executor.submit(process_component, owner, repo, component): component["mainFile"] for component in component_structure}
        for future in as_completed(future_to_file):
            main_file = future_to_file[future]
            try:
                result = future.result()
                all_inputs[main_file] = result
            except Exception as exc:
                print(f'{main_file} generated an exception: {exc}')
    
    # Write all inputs at once
    for main_file, content in all_inputs.items():
        output_filename = main_file.replace('/', '-') + ".txt"
        with open(os.path.join("AI_first_input", output_filename), 'w', encoding='utf-8') as outfile:
            outfile.write(content)
    
    return all_inputs

def process_component(owner, repo, component):
    main_file = component["mainFile"]
    content = f"Main File:\nPath: {main_file}\n"
    content += f"Code: {get_cleaned_code(owner, repo, main_file)}\n\n"
    
    content += "Files used in this main file:\n"
    for used_file in component["components"]:
        content += f"{used_file}: {get_cleaned_code(owner, repo, used_file)}\n"
    
    return content

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

if __name__ == "__main__":
    # This is just for testing purposes
    test_structure = [
        {
            "mainFile": "test/main1.js",
            "components": ["test/component1.js", "test/component2.js"]
        },
        {
            "mainFile": "test/main2.js",
            "components": ["test/component3.js", "test/component4.js"]
        }
    ]
    generate_structured_inputs(test_structure)
import os
import json

def generate_final_output():
    final_output = {}
    
    for filename in os.listdir("FinalOutputs"):
        if filename.endswith(".json"):
            with open(os.path.join("FinalOutputs", filename), 'r', encoding='utf-8') as f:
                problem_data = json.load(f)
            
            key = filename.replace('.json', '')
            final_output[key] = {
                "title": problem_data.get("title", ""),
                "description": problem_data.get("description", ""),
                "mainFile": problem_data.get("mainFile", ""),
                "components": problem_data.get("components", []),
                "content": problem_data.get("content", "")
            }
    
    return final_output

if __name__ == "__main__":
    output = generate_final_output()
    print(json.dumps(output, indent=2))
import os
import requests
from dotenv import load_dotenv
from prompts import PROMPTS
from config import OPTION

# Load environment variables
load_dotenv()

def extract_main_files(github_structure):
    print(f"Starting AI main files extraction using {OPTION} option...")
    
    system_prompt = PROMPTS[OPTION]["step1"]
    
    url = os.getenv("IBM_API_URL")
    
    body = {
        "input": f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
System instructions: {system_prompt}

Input: {github_structure}
""",
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 900,
            "repetition_penalty": 1
        },
        "model_id": "meta-llama/llama-3-1-70b-instruct",
        "project_id": os.getenv("IBM_PROJECT_ID"),
        "moderations": {
            "hap": {
                "input": {
                    "enabled": True,
                    "threshold": 0.5,
                    "mask": {
                        "remove_entity_value": True
                    }
                },
                "output": {
                    "enabled": True,
                    "threshold": 0.5,
                    "mask": {
                        "remove_entity_value": True
                    }
                }
            }
        }
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": os.getenv("IBM_AUTH_HEADER")
    }

    response = requests.post(
        url,
        headers=headers,
        json=body
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()
    
    output = data['results'][0]['generated_text']
    
    output_file = os.path.join("outputs", "0002-Main_files.txt")
    with open(output_file, "w") as f:
        f.write(output)
    
    print("AI main files extraction finished.")
    return output
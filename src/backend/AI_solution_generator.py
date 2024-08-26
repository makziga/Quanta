import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def generate_ai_solution(problem_content):
    print("Starting AI solution generation...")
    
    system_prompt = """
    You are an expert developer tasked with fixing code issues. Given the following problem description and code, provide a detailed solution with corrected code:

    Please provide a comprehensive solution, including:
    1. A brief explanation of the issue
    2. The corrected code
    3. An explanation of the changes made
    """
    
    url = os.getenv("IBM_API_URL")
    
    body = {
        "input": f"""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
System instructions: {system_prompt}

Input: {problem_content}
""",
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 2000,
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
    
    print("AI solution generation finished.")
    return output
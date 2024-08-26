import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

IBM_API_URL = os.getenv("IBM_API_URL")
IBM_PROJECT_ID = os.getenv("IBM_PROJECT_ID")
IBM_AUTH_HEADER = os.getenv("IBM_AUTH_HEADER")

def read_problem_summaries():
    summaries = []
    problems_dir = "Problems"
    for filename in os.listdir(problems_dir):
        if filename.endswith("_problem.txt"):
            with open(os.path.join(problems_dir, filename), 'r') as f:
                content = f.read()
                try:
                    problem_json = json.loads(content)
                    if 'summary' in problem_json:
                        summaries.append(problem_json['summary'])
                except json.JSONDecodeError:
                    print(f"Error parsing JSON in {filename}")
    return summaries

def generate_final_summary(summaries):
    prompt = f"""
    You are an AI assistant tasked with creating a concise and informative final summary for a software analysis report. 
    Based on the following individual summaries from different parts of the analysis, create a comprehensive yet brief 
    final summary that captures the key points and overall assessment of the software.

    Individual summaries:
    {' '.join(summaries)}

    Please provide a final summary that:
    1. Gives an overall assessment of the software's condition.
    2. Highlights the most critical issues or findings.
    3. Provides a general recommendation or next steps.

    Keep the summary under 150 words.
    """

    body = {
        "input": f"""System:
{prompt}

Answer:
""",
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 200,
            "repetition_penalty": 1
        },
        "model_id": "ibm/granite-34b-code-instruct",
        "project_id": IBM_PROJECT_ID
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": IBM_AUTH_HEADER
    }

    response = requests.post(
        IBM_API_URL,
        headers=headers,
        json=body
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()
    return data['results'][0]['generated_text'].strip()

def create_final_summary():
    summaries = read_problem_summaries()
    final_summary = generate_final_summary(summaries)
    
    # Save the final summary
    with open("outputs/final_summary.txt", "w") as f:
        f.write(final_summary)
    
    return final_summary
import os
import json
import requests
import asyncio
import aiohttp
from prompts import PROMPTS
from config import OPTION
from problem_separator import separate_problems
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

IBM_API_URL = os.getenv("IBM_API_URL")
IBM_PROJECT_ID = os.getenv("IBM_PROJECT_ID")
IBM_AUTH_HEADER = os.getenv("IBM_AUTH_HEADER")

def fix_json(json_string):
    json_string = json_string.strip()
    if not json_string.startswith('{'):
        json_string = '{' + json_string
    if not json_string.endswith('}'):
        json_string = json_string + '}'
    json_string = json_string.replace("'", '"')
    return json_string

def clean_json_output(output):
    while output.lstrip().startswith("```json"):
        output = output.lstrip()[7:].lstrip()
    while output.rstrip().endswith("```"):
        output = output.rstrip()[:-3].rstrip()
    output = output.strip()
    start_index = output.find('{')
    end_index = output.rfind('}')
    if start_index != -1 and end_index != -1:
        output = output[start_index:end_index+1]
    return output

async def generate_ai_problem(session, input_content, main_file):
    print(f"Generating AI problem for {main_file}...")
    system_prompt = PROMPTS[OPTION]["step2"]
    full_prompt = f"<s>System Instructions: {system_prompt} User Input: {input_content}</s>"
    
    body = {
        "input": full_prompt,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 10000,
            "repetition_penalty": 1
        },
        "model_id": "mistralai/mistral-large",
        "project_id": IBM_PROJECT_ID
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": IBM_AUTH_HEADER
    }

    try:
        async with session.post(IBM_API_URL, headers=headers, json=body) as response:
            if response.status != 200:
                raise Exception(f"Non-200 response: {await response.text()}")

            data = await response.json()
            output = data['results'][0]['generated_text']

        cleaned_output = clean_json_output(output)

        if not os.path.exists("Problems"):
            os.makedirs("Problems")
        
        output_file = os.path.join("Problems", main_file.replace('/', '-') + "_problem.txt")
        with open(output_file, "w") as f:
            f.write(cleaned_output)
        
        try:
            problem_json = json.loads(cleaned_output)
        except json.JSONDecodeError:
            fixed_output = fix_json(cleaned_output)
            try:
                problem_json = json.loads(fixed_output)
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON for {main_file}: {e}")
                print("Original output:", output)
                print("Cleaned output:", cleaned_output)
                print("Fixed output:", fixed_output)
                return None
        
        separate_problems(problem_json)
        
        print(f"AI problem generation finished for {main_file}.")
        return problem_json

    except Exception as e:
        print(f"Error generating AI problem for {main_file}: {str(e)}")
        return None

async def process_all_inputs(inputs):
    async with aiohttp.ClientSession() as session:
        tasks = [generate_ai_problem(session, content, main_file) for main_file, content in inputs.items()]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    
    for result in results:
        if isinstance(result, Exception):
            print(f"An error occurred during processing: {result}")

async def generate_ai_problems(inputs):
    await process_all_inputs(inputs)
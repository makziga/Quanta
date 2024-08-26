import os
import json
import asyncio
import re
import aiohttp
from dotenv import load_dotenv
from prompts import PROMPTS
from config import OPTION
from collections import deque
from time import time

# Load environment variables
load_dotenv()

IBM_API_URL = os.getenv("IBM_API_URL")
IBM_PROJECT_ID = os.getenv("IBM_PROJECT_ID")
IBM_AUTH_HEADER = os.getenv("IBM_AUTH_HEADER")

# Rate limiting settings
MAX_REQUESTS = 7
TIME_WINDOW = 2  # seconds
REQUEST_TIMEOUT = 30  # seconds

class RateLimiter:
    def __init__(self, max_requests, time_window):
        self.max_requests = max_requests
        self.time_window = time_window
        self.request_times = deque()

    async def wait(self):
        now = time()
        while len(self.request_times) >= self.max_requests:
            if now - self.request_times[0] > self.time_window:
                self.request_times.popleft()
            else:
                await asyncio.sleep(0.1)
                now = time()
        self.request_times.append(now)

rate_limiter = RateLimiter(MAX_REQUESTS, TIME_WINDOW)
semaphore = asyncio.Semaphore(MAX_REQUESTS)

def format_content(content):
    return content.replace('\\n', '\n')

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

async def generate_ai_details(problem_content, file_name):
    print(f"Generating AI details for {file_name}...")
    system_prompt = PROMPTS[OPTION]["step3"]
    
    full_prompt = f"<s>System Instructions: {system_prompt} User Input: {problem_content}</s>"
    
    body = {
        "input": full_prompt,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 5000,
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

    async with semaphore:
        await rate_limiter.wait()
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(IBM_API_URL, headers=headers, json=body, timeout=REQUEST_TIMEOUT) as response:
                    if response.status != 200:
                        raise Exception(f"Non-200 response: {await response.text()}")
                    output = await response.json()
        except asyncio.TimeoutError:
            print(f"Request for {file_name} timed out after {REQUEST_TIMEOUT} seconds. Ignoring.")
            return None

    generated_text = output['results'][0]['generated_text']
    cleaned_output = clean_json_output(generated_text)
    
    try:
        output_json = json.loads(cleaned_output)
    except json.JSONDecodeError:
        fixed_output = fix_json(cleaned_output)
        try:
            output_json = json.loads(fixed_output)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON for {file_name}: {e}")
            print("Original output:", generated_text)
            print("Cleaned output:", cleaned_output)
            print("Fixed output:", fixed_output)
            return None

    output_json['content'] = format_content(output_json['content'])
    
    main_file_match = re.search(r"Main file: (.+)", problem_content)
    components_match = re.search(r"Components: (.+)", problem_content)
    
    output_json['mainFile'] = main_file_match.group(1) if main_file_match else ""
    output_json['components'] = components_match.group(1).split(", ") if components_match else []
    
    if not os.path.exists("FinalOutputs"):
        os.makedirs("FinalOutputs")
    
    output_file = os.path.join("FinalOutputs", file_name.replace('.txt', '.json'))
    with open(output_file, "w", encoding='utf-8') as f:
        json.dump(output_json, f, indent=2)
    
    print(f"AI details generation finished for {file_name}.")
    return output_json

async def process_all_problems():
    tasks = []
    for filename in os.listdir("Separated Problems"):
        if filename.endswith(".txt"):
            with open(os.path.join("Separated Problems", filename), 'r', encoding='utf-8') as f:
                problem_content = f.read()
            task = asyncio.create_task(generate_ai_details(problem_content, filename))
            tasks.append(task)
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return [r for r in results if r is not None and not isinstance(r, Exception)]

async def generate_ai_details_for_all():
    return await process_all_problems()

if __name__ == "__main__":
    asyncio.run(generate_ai_details_for_all())
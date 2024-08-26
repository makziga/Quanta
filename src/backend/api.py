from flask import Flask, request, jsonify
from flask_cors import CORS
import asyncio
from main import run_analysis
from AI_solution_generator import generate_ai_solution

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    github_repo_url = data.get('github_repo_url')
    option = data.get('option')
    
    if not github_repo_url or not option:
        return jsonify({"error": "Missing github_repo_url or option"}), 400
    
    result = asyncio.run(run_analysis(github_repo_url, option))
    return jsonify(result)

@app.route('/generate-solution', methods=['POST'])
def solution():
    data = request.json
    problem_content = data.get('problem_content')
    
    if not problem_content:
        return jsonify({"error": "Missing problem_content"}), 400
    
    result = generate_ai_solution(problem_content)
    return jsonify({"solution": result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
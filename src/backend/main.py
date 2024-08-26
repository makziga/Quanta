import os
import asyncio
from github_extractor import extract_github_structure
from AI_mainFiles_extractor import extract_main_files
from related_files_extractor import extract_related_files
from input_generator import generate_structured_inputs
from AI_problems import generate_ai_problems
from AI_Details import generate_ai_details_for_all
from final_output_generator import generate_final_output
from final_summary_generator import create_final_summary  # Add this import
from AI_solution_generator import generate_ai_solution

async def run_analysis(github_repo_url, option):
    print("Starting GitHub structure extraction...")
    
    if not os.path.exists("outputs"):
        os.makedirs("outputs")
    
    github_structure_file = os.path.join("outputs", "0001-Github_structure.txt")
    
    extract_github_structure(github_repo_url, github_structure_file)
    
    print("GitHub structure extraction finished.")
    
    # Read the GitHub structure
    with open(github_structure_file, "r") as f:
        github_structure = f.read()
    
    # Extract main files using AI
    extract_main_files(github_structure)
    
    # Extract related files
    print("Extracting related files...")
    related_files_output = extract_related_files()
    print("Related files extraction finished.")
    
    # Generate structured inputs
    print("Generating structured inputs...")
    all_inputs = generate_structured_inputs(related_files_output["componentStructure"])
    print("Structured inputs generation finished.")
    
    # Generate AI problems
    print("Generating AI problems...")
    await generate_ai_problems(all_inputs)
    print("AI problems generation and separation finished.")
    
    # Generate AI details
    print("Generating AI details...")
    await generate_ai_details_for_all()
    print("AI details generation finished.")
    
    # Generate final summary
    print("Generating final summary...")
    final_summary = create_final_summary()
    print("Final summary generation finished.")
    
    # Generate final output
    print("Generating final output...")
    final_output = generate_final_output()
    print("Final output generation finished.")

    # Add the final summary to the final output
    final_output['summary'] = final_summary

    # Add this function to the file
    def generate_ai_solution(problem_content):
        return generate_ai_solution(problem_content)

    return final_output

if __name__ == "__main__":
    asyncio.run(run_analysis("https://github.com/example/repo", "Security"))
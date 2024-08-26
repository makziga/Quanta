PROMPTS = {
    "Security": {
        "step1": """Your task is to analyze a list of file paths and identify which paths represent parent files that potentially contain or import child files. Parent files can be files like tabs, pages, main files, app files, or any file that might import components or other files, while child files are like components, etc.

To complete this task, follow these steps:

1. Analyze each file path in the given list.
2. Identify parent files based on the following criteria:
   - Files in directories and folders like "pages," "layouts," "views," "screens," "tabs," and similar (which can be named differently, but the topic of the folder is these names). Provide all pages, tabs, you can find, don't ignore neither one. 
   - Files with names indicating they might be containers or sections  (e.g., "Home," "About," "Main," "App," and similar). 
   - Files that are likely to import other components (e.g., "index" files, files ending with "Page" or "View," and similar).
3. Create a list of these potential parent files.
4. Output that list as a JSON object with a single key, "mainFiles," whose value is an array of identified parent file paths.
5. Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 
Do not provide component paths. Just main files.

Here is how your output MUST be structured: 

{
  "mainFiles": [
    "src/pages/Home.tsx",
    "src/pages/About.tsx",
    "src/layouts/MainLayout.tsx"
  ]
}

Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON. You MUST provide all main files. This doesn't mean just the main file of the whole project, but main files like all tabs, pages, etc., and any code that has a big component which uses other components to finish that main component. Before creating the output, think about the connection between files and then output the JSON. If there are multiple tabs, pages, etc. provide them all. Also do not forget to provide python main files for backend or anything similar. You MUST NOT provide paths from COMPONENTS, CONTEXT or HOOKS. Do NOT PROVIDE STYLES. Just find the main files.""",
        "step2": """Your task is to analyze provided codes and find security vulnerabilities. You MUST identify any security-related issues in the provided code and present your findings in a structured JSON format.

Pay close attention to:
1. XSS vulnerabilities
2. Insecure data handling
3. Authentication and authorization flaws
4. Injection vulnerabilities (SQL, command, etc.)
5. Insecure cryptographic practices
6. Sensitive data exposure
7. Security misconfigurations

Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 

After your analysis, provide your findings in the following JSON format:

{
"summary": "A brief overview of the security analysis for the parent code and its components",
  "analysisResults": [
    {
      "mainFile": "Name of the parent file",
        "issues": [
        {
          "title": "Title of the security issue",
          "description": "One-sentence description of the security issue",
          "details": "One paragraph providing more details about the security issue",
          "fileNames": [
            "List of file names (parent and/or component) where the issue was found"
        ]
      }
      ]
    }
  ]
}

Focus solely on security-related issues in your analysis. Do not include performance, style, or other non-security related concerns.

If no security issues are found in either the parent code or any of the component codes, provide an output with an empty "issues" array and a summary stating that no security vulnerabilities were detected.
Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON.

Keep in mind to always create a connection between the file where the problem is located and other files. Consider whether this problem can affect other files, and if so, include them in fileNames. If the problem is not visible or the code doesn't currently have an issue, don't include potential problems or any speculations. Each title MUST be different. Keep in mind that YOU MUST NOT provide problems that are simple, problems that lack evidence, speculative problems, or imaginary problems. Make sure to reference which function or something else is creating the problem. If you are showing an example, don't use backtick, instead use this normal marks since you are outputting in json and it can create conflict with out code.""",
        "step3": """Your task is to create a detailed description of a security problem in provided codes. Your output MUST be in JSON format which includes title, one sentence description and detailed content explaining the security vulnerability. User will input what is the problem and you will explain that problem more detailed.
To complete this task, follow these steps:

1. Carefully analyze the provided code and problem information.
2. Identify the security vulnerability or problem present in the code.
3. Create a detailed explanation of the security issue, including:
    - A clear description of the vulnerability
    - Relevant code snippets that demonstrate the problem
    - Potential attack vectors
    - Recommended solutions or best practices to address the issue
4. Format your analysis into a markdown-style content, using appropriate headings (maximum heading level: #) and code blocks for snippets.
5. Summarize the issue in a single sentence for the "description" field.

Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 


Your output MUST be formatted as a JSON object with the following structure:
    {
        "title": "Title of the security issue",
        "description": "One-sentence description of the problem",
        "content": `Detailed markdown-formatted explanation of the security vulnerability, including code snippets, potential attack vectors, recommended solution, etc. without using \n since we are using backtick.`
}
Ensure that the "content" field contains a comprehensive analysis with proper markdown formatting, including code blocks for relevant snippets.
Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON. Make sure to include file paths inside content so that user can know to which files this problem is related. Provide full path.""",
    },
    "Performance": {
        "step1": """Your task is to analyze a list of file paths and identify which paths represent parent files that potentially contain or import child files. Parent files can be files like tabs, pages, main files, app files, or any file that might import components or other files, while child files are like components, etc.

To complete this task, follow these steps:

1. Analyze each file path in the given list.
2. Identify parent files based on the following criteria:
   - Files in directories and folders like "pages," "layouts," "views," "screens," "tabs," and similar (which can be named differently, but the topic of the folder is these names). Provide all pages, tabs, you can find, don't ignore neither one. 
   - Files with names indicating they might be containers or sections  (e.g., "Home," "About," "Main," "App," and similar). 
   - Files that are likely to import other components (e.g., "index" files, files ending with "Page" or "View," and similar).
3. Create a list of these potential parent files.
4. Output that list as a JSON object with a single key, "mainFiles," whose value is an array of identified parent file paths.
5. Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 
Do not provide component paths. Just main files.

Here is how your output MUST be structured: 

{
  "mainFiles": [
    "src/pages/Home.tsx",
    "src/pages/About.tsx",
    "src/layouts/MainLayout.tsx"
  ]
}

Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON. You MUST provide all main files. This doesn't mean just the main file of the whole project, but main files like all tabs, pages, etc., and any code that has a big component which uses other components to finish that main component. Before creating the output, think about the connection between files and then output the JSON. If there are multiple tabs, pages, etc. provide them all. Also do not forget to provide python main files for backend or anything similar. You MUST NOT provide paths from COMPONENTS, CONTEXT or HOOKS. Do NOT PROVIDE STYLES. Just find the main files.""",
        "step2": """Your task is to analyze provided codes and find performance bottlenecks. You MUST identify any performance-related issues in the provided code and present your findings in a structured JSON format.

Pay close attention to:
1. Inefficient algorithms
2. Unnecessary computations
3. Memory leaks
4. Excessive I/O operations
5. Unoptimized database queries
6. Poor resource management
7. Inefficient data structures

Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 

After your analysis, provide your findings in the following JSON format:

{
"summary": "A brief overview of the performance analysis for the parent code and its components",
  "analysisResults": [
    {
      "mainFile": "Name of the parent file",
        "issues": [
        {
          "title": "Title of the performance issue",
          "description": "One-sentence description of the performance issue",
          "details": "One paragraph providing more details about the performance issue",
          "fileNames": [
            "List of file names (parent and/or component) where the issue was found"
        ]
      }
      ]
    }
  ]
}

Focus solely on performance-related issues in your analysis. Do not include security, style, or other non-performance related concerns.

If no performance issues are found in either the parent code or any of the component codes, provide an output with an empty "issues" array and a summary stating that no performance bottlenecks were detected.
Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON.

Keep in mind to always create a connection between the file where the problem is located and other files. Consider whether this problem can affect other files, and if so, include them in fileNames. If the problem is not visible or the code doesn't currently have an issue, don't include potential problems or any speculations. Each title MUST be different. Keep in mind that YOU MUST NOT provide problems that are simple, problems that lack evidence, speculative problems, or imaginary problems. Make sure to reference which function or something else is creating the problem. If you are showing an example, don't use backtick, instead use this normal marks since you are outputting in json and it can create conflict with out code.""",
        "step3": """Your task is to create a detailed description of a performance problem in provided codes. Your output MUST be in JSON format which includes title, one sentence description and detailed content explaining the performance bottleneck. User will input what is the problem and you will explain that problem more detailed.
To complete this task, follow these steps:

1. Carefully analyze the provided code and problem information.
2. Identify the performance bottleneck or problem present in the code.
3. Create a detailed explanation of the performance issue, including:
    - A clear description of the bottleneck
    - Relevant code snippets that demonstrate the problem
    - Potential impact on system resources and execution time
    - Recommended optimizations or best practices to improve performance
4. Format your analysis into a markdown-style content, using appropriate headings (maximum heading level: #) and code blocks for snippets.
5. Summarize the issue in a single sentence for the "description" field.

Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 

Your output MUST be formatted as a JSON object with the following structure:
    {
        "title": "Title of the performance issue",
        "description": "One-sentence description of the problem",
        "content": `Detailed markdown-formatted explanation of the performance bottleneck, including code snippets, potential resource impacts, recommended optimizations, etc. without using \n since we are using backtick.`
}
Ensure that the "content" field contains a comprehensive analysis with proper markdown formatting, including code blocks for relevant snippets.
Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON. Make sure to include file paths inside content so that user can know to which files this problem is related. Provide full path."""
    },
    "Bugs": {
        "step1": """Your task is to analyze a list of file paths and identify which paths represent parent files that potentially contain or import child files. Parent files can be files like tabs, pages, main files, app files, or any file that might import components or other files, while child files are like components, etc.

To complete this task, follow these steps:

1. Analyze each file path in the given list.
2. Identify parent files based on the following criteria:
   - Files in directories and folders like "pages," "layouts," "views," "screens," "tabs," and similar (which can be named differently, but the topic of the folder is these names). Provide all pages, tabs, you can find, don't ignore neither one. 
   - Files with names indicating they might be containers or sections  (e.g., "Home," "About," "Main," "App," and similar). 
   - Files that are likely to import other components (e.g., "index" files, files ending with "Page" or "View," and similar).
3. Create a list of these potential parent files.
4. Output that list as a JSON object with a single key, "mainFiles," whose value is an array of identified parent file paths.
5. Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 
Do not provide component paths. Just main files.

Here is how your output MUST be structured: 

{
  "mainFiles": [
    "src/pages/Home.tsx",
    "src/pages/About.tsx",
    "src/layouts/MainLayout.tsx"
  ]
}

Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON. You MUST provide all main files. This doesn't mean just the main file of the whole project, but main files like all tabs, pages, etc., and any code that has a big component which uses other components to finish that main component. Before creating the output, think about the connection between files and then output the JSON. If there are multiple tabs, pages, etc. provide them all. Also do not forget to provide python main files for backend or anything similar. You MUST NOT provide paths from COMPONENTS, CONTEXT or HOOKS. Do NOT PROVIDE STYLES. Just find the main files.""",
        "step2": """Your task is to analyze provided codes and identify potential bugs and logical errors. You MUST detect any issues that could cause problems in production and present your findings in a structured JSON format.

Pay close attention to:
1. Off-by-one errors
2. Null pointer exceptions
3. Race conditions
4. Infinite loops
5. Incorrect error handling
6. Type mismatches
7. Boundary condition errors

Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks. 

After your analysis, provide your findings in the following JSON format:

{
"summary": "A brief overview of the bug and issue analysis for the parent code and its components",
  "analysisResults": [
    {
      "mainFile": "Name of the parent file",
        "issues": [
        {
          "title": "Title of the bug or logical error",
          "description": "One-sentence description of the issue",
          "details": "One paragraph providing more details about the bug or logical error",
          "fileNames": [
            "List of file names (parent and/or component) where the issue was found"
        ]
      }
      ]
    }
  ]
}

Focus solely on bugs and logical errors in your analysis. Do not include performance, style, or other non-bug related concerns.

If no bugs or logical errors are found in either the parent code or any of the component codes, provide an output with an empty "issues" array and a summary stating that no potential issues were detected.
Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON.

Keep in mind to always create a connection between the file where the problem is located and other files. Consider whether this problem can affect other files, and if so, include them in fileNames. If the problem is not visible or the code doesn't currently have an issue, don't include potential problems or any speculations. Each title MUST be different. Keep in mind that YOU MUST NOT provide problems that are simple, problems that lack evidence, speculative problems, or imaginary problems. Make sure to reference which function or something else is creating the problem. If you are showing an example, don't use backtick, instead use this normal marks since you are outputting in json and it can create conflict with out code.""",
        "step3": """Your task is to create a detailed description of potential bugs and logical errors in the provided code. Your output MUST be in JSON format which includes title, one sentence description, and detailed content explaining the bug or logical error. The user will input what the problem is, and you will explain that problem in more detail.

To complete this task, follow these steps:

1. Carefully analyze the provided code and problem information.
2. Identify the potential bug or logical error present in the code.
3. Create a detailed explanation of the issue, including:
    - A clear description of the bug or logical error
    - Relevant code snippets that demonstrate the problem
    - Potential consequences or unexpected behaviors
    - Recommended solutions or best practices to address the issue
4. Format your analysis into a markdown-style content, using appropriate headings (maximum heading level: #) and code blocks for snippets.
5. Summarize the issue in a single sentence for the "description" field.

Ensure that the JSON is properly formatted and valid. You MUST NOT use "```json" to provide json. Just write it without these marks.

Your output MUST be formatted as a JSON object with the following structure:
    {
        "title": "Title of the bug or logical error",
        "description": "One-sentence description of the problem",
        "content": `Detailed markdown-formatted explanation of the bug or logical error, including code snippets, potential consequences, recommended solution, etc. without using \n since we are using backtick.`
    }Ensure that the "content" field contains a comprehensive analysis with proper markdown formatting, including code blocks for relevant snippets.
Now, without any comments, output only the JSON. YOU MUST NOT WRITE ANYTHING ELSE EXCEPT JSON. Make sure to include file paths inside content so that user can know to which files this problem is related. Provide full path."""
    }
}
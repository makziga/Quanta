# Quanta: AI-Powered Code Analysis Tool

Quanta is an advanced AI agent that analyzes GitHub repositories to identify security vulnerabilities, performance bottlenecks, and potential bugs. Using open-source models from IBM watsonx, Quanta provides comprehensive code analysis without compromising data privacy.

## Features

- **Security Analysis**: Detects vulnerabilities like SQL injections, XSS, and hardcoded secrets.
- **Performance Optimization**: Identifies inefficient algorithms, memory leaks, and unoptimized queries.
- **Bug Detection**: Spots logical errors, null pointer exceptions, and race conditions.
- **Open-Source Models**: Ensures your code remains private and secure.
- **Comprehensive Reports**: Provides detailed descriptions of each issue along with suggested solutions.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js and npm

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/9maky/quanta.git
   cd quanta
   ```

2. Install Python requirements:

   ```
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000
      IBM_API_URL=[url]
   IBM_PROJECT_ID=[id]
   IBM_AUTH_HEADER=Bearer [token]
   ```

### Running the Application

1. Start the frontend:

   ```
   npm start
   ```

2. Start the backend:
   ```
   cd src/backend
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   python api.py
   ```

The application should now be running. Access the frontend at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Usage

1. Send link of your GitHub repository to Quanta.
2. Let Quanta analyze your codebase.
3. Review the comprehensive report of security vulnerabilities, performance issues, and potential bugs.
4. Implement the suggested solutions to improve your code quality.

## Acknowledgments

- IBM watsonx for providing the AI models

# Text-to-SQL Agent with LangChain & ChatWatsonx

A React-based chat interface that converts natural language queries into SQL using IBM watsonx.ai and LangChain's ReAct agent pattern.

## Features

- Natural Language to SQL conversion powered by AI
- Interactive chat interface built with React and Tailwind CSS (dark mode)
- IBM watsonx.ai integration utilizing Mistral AI models
- ReAct agent pattern using LangChain for robust reasoning and actions
- Message persistence designed for database integration with StoredMessage serialization
- Scrollable chat UI with distinct, styled AI SQL query outputs
- Sidebar for displaying full database schema with syntax-friendly formatting

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS (with dark mode support)
- **AI/ML:** LangChain, IBM watsonx.ai, Mistral AI
- **State Management:** React useState, useRef hooks
- **Build Tool:** Next.js

## Prerequisites

- Node.js 18+ and npm/yarn
- IBM watsonx.ai account and API credentials
- Basic understanding of SQL, React, and AI agents

## Installation

1. Clone the repository
   ```
   git clone <your-repo-url>
   cd text-to-sql-agent
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables in `.env.local`
   ```
   WATSONX_AI_PROJECT_ID=your_project_id_here
   WATSONX_AI_ENDPOINT=https://us-south.ml.cloud.ibm.com
   WATSONX_AI_VERSION=2023-05-29
   ```

4. Run the development server
   ```
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`

## Configuration

### IBM watsonx.ai Setup

- Create an IBM watsonx.ai account
- Set up a new project and obtain the project ID and API endpoint
- Ensure access to Mistral AI models for natural language processing

### Model Configuration

- The default model used is `mistralai/mistral-large` (configurable in `actions.ts`)

## Usage

1. Enter your natural language query in the input textarea.
2. Press `Enter` or click `Send` (Shift+Enter inserts newline).
3. The agent converts your input to a SQL query, which is displayed as a syntax-highlighted code bubble.
4. View your full conversation history in a scrollable chat interface.
5. Reference the database schema conveniently in the sidebar for guidance.

### Example Queries

- "Show me all customers"
- "Find orders from last week"
- "Get total sales by region ordered by create_date"

## Project Structure

```
app/
├── page.tsx          # Main chat UI component with dark mode and chat logic
└── actions.ts        # LangChain agent and AI interaction logic

components/           # Optional reusable UI components (if applicable)
public/               # Static assets
constant.ts           # Database schema SQL constants
```
```
[8](https://www.geeksforgeeks.org/git/what-is-readme-md-file/)
[9](https://confluence.atlassian.com/spaces/BitbucketServer/pages/776639995/Markdown+syntax+guide)
[10](https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops)

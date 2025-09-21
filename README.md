# Text-to-SQL Agent with LangChain & ChatWatsonx

A React-based chat interface that converts natural language queries into SQL using IBM watsonx.ai and LangChain's ReAct agent pattern.

## Features

- Natural Language to SQL conversion
- Chat interface with React and Tailwind CSS
- IBM watsonx.ai integration with Mistral AI models
- ReAct agent pattern using LangChain
- Message persistence ready for database integration with StoredMessage serialization

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI/ML**: LangChain, IBM watsonx.ai, Mistral AI
- **State Management**: React useState hooks
- **Build Tool**: Next.js

## Prerequisites

- Node.js 18+ and npm
- IBM watsonx.ai account and API credentials
- Basic understanding of SQL and React

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

3. Set up environment variables in `.env.local` file
   ```
   WATSONX_AI_PROJECT_ID=your_project_id_here
   WATSONX_AI_ENDPOINT=https://us-south.ml.cloud.ibm.com
   WATSONX_AI_VERSION=2023-05-29
   ```

4. Run development server
   ```
   npm run dev
   ```

5. Open browser at `http://localhost:3000`

## Configuration

### IBM watsonx.ai Setup

1. Sign up for IBM watsonx.ai account
2. Create new project
3. Get project ID and API endpoint
4. Ensure access to Mistral AI models

### Model Configuration

The agent uses `mistralai/mistral-large`. Modify in `actions.ts` if needed.

## Usage

1. Type natural language query in input field
2. Click Submit to send query
3. Agent processes request and generates response
4. View conversation history in chat interface

### Example Queries

- "Show me all customers"
- "Find orders from last week"
- "Get total sales by region"

## Project Structure

```
app/
├── page.tsx          # Main chat interface
└── actions.ts        # LangChain agent logic
components/
public/
```

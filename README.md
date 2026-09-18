# DevFlow AI

**AI Project Engineering Orchestrator**

DevFlow AI takes a vague software project idea and turns it into an engineered, reviewable project blueprint.

## Current MVP

- Flask backend
- Agno project manager agent
- Groq model configuration
- Health endpoint
- Project analysis endpoint
- Basic frontend
- Placeholder modules for future multi-agent orchestration, tools, RAG, memory, GitHub integration, and code analysis

## Setup

### 1. Create and activate virtual environment

Windows PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```powershell
pip install -r requirements.txt
```

### 3. Configure API key

Open `.env` and replace:

```env
GROQ_API_KEY=your_groq_api_key_here
```

with your actual Groq API key.

### 4. Run

```powershell
python run.py
```

Backend:

```text
http://127.0.0.1:5000
```

Health check:

```text
http://127.0.0.1:5000/health
```

## Roadmap

1. Project Manager Agent
2. Requirements Agent
3. Research Agent
4. Architecture Agent
5. Task Planner Agent
6. Reviewer Agent
7. Orchestration
8. Tools
9. Project memory
10. RAG
11. GitHub integration
12. Code analysis
13. Autonomous execution

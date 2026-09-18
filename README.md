# 🚀 DevFlow AI

### AI Project Engineering Orchestrator

DevFlow AI transforms a **vague software project idea into a structured, reviewable engineering blueprint** using AI-powered project planning.

Instead of jumping directly into coding, DevFlow AI helps break an idea into **requirements, architecture, technology choices, tasks, testing strategy, and future improvements**.

---

## ✨ Current MVP

The current MVP includes:

* 🧠 **Agno Project Manager Agent**
* 🤖 **Groq-powered LLM integration**
* 🌐 **Flask backend**
* 📋 **Project analysis endpoint**
* ❤️ **Health check endpoint**
* 💻 **Basic frontend interface**
* 🏗️ Placeholder modules for future:

  * Multi-agent orchestration
  * Web/GitHub tools
  * RAG
  * Project memory
  * Code analysis
  * Autonomous execution

---

## 🏗️ Planned Architecture

DevFlow AI is designed around multiple specialized agents:

```text
User Idea
    ↓
Project Manager
    ↓
Requirements Agent
    ↓
Research Agent
    ↓
Architecture Agent
    ↓
Task Planner
    ↓
Reviewer
    ↓
Engineering Blueprint
```

The long-term goal is to make these agents work together through an orchestration layer.

---

## 📌 Roadmap

### Phase 1 — Core Agents

1. Project Manager Agent
2. Requirements Agent
3. Research Agent
4. Architecture Agent
5. Task Planner Agent
6. Reviewer Agent

### Phase 2 — Agent Orchestration

7. Multi-agent workflow
8. Agent communication
9. Structured project state

### Phase 3 — Engineering Tools

10. Web research tools
11. GitHub integration
12. File/project reader
13. Code analysis

### Phase 4 — Knowledge & Memory

14. RAG pipeline
15. Project memory
16. Context-aware project refinement

### Phase 5 — Autonomous Engineering

17. Blueprint refinement
18. Implementation planning
19. Automated project execution
20. Continuous review and improvement

---

## 🛠️ Tech Stack

* **Python**
* **Flask**
* **Agno**
* **Groq**
* **HTML / CSS / JavaScript**
* **RAG & Vector Search** *(planned)*
* **GitHub Integration** *(planned)*

---

## ⚙️ Setup

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

### 3. Configure API Key

Create or open `.env` and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the application

```powershell
python run.py
```

The backend will be available at:

```text
http://127.0.0.1:5000
```

### Health Check

Open:

```text
http://127.0.0.1:5000/health
```

Expected response:

```json
{
  "project": "DevFlow AI",
  "status": "healthy"
}
```

---

## 🎯 Vision

DevFlow AI aims to evolve from a simple project-analysis assistant into an **AI engineering orchestrator** capable of coordinating specialized agents, researching technical decisions, maintaining project context, reviewing implementation plans, and eventually assisting with autonomous project execution.

---

## 📂 Project Structure

```text
DevFlowAI/
│
├── app/
│   ├── agents/
│   │   ├── manager.py
│   │   ├── requirements.py
│   │   ├── researcher.py
│   │   ├── architect.py
│   │   ├── planner.py
│   │   └── reviewer.py
│   │
│   ├── orchestration/
│   │   └── workflow.py
│   │
│   ├── tools/
│   │   ├── web_search.py
│   │   ├── github.py
│   │   ├── file_reader.py
│   │   └── code_analyzer.py
│   │
│   ├── rag/
│   │   ├── ingest.py
│   │   └── retriever.py
│   │
│   ├── memory/
│   │   └── project_memory.py
│   │
│   ├── services/
│   │   └── blueprint_service.py
│   │
│   └── routes.py
│
├── frontend/
│   └── index.html
│
├── run.py
├── requirements.txt
├── .env
└── README.md
```

---

## 🚧 Project Status

**Current stage:** MVP / Active Development

DevFlow AI is being developed incrementally, starting with the core project manager and gradually introducing specialized agents, orchestration, tools, memory, RAG, and autonomous capabilities.

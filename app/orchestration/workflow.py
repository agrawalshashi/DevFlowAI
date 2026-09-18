from app.agents.manager import create_manager_agent


def run_devflow(idea):

    manager = create_manager_agent()

    response = manager.run(
        f"""
Create a concise engineering blueprint for this project:

{idea}

Return these sections:

1. Project Overview
2. Requirements
3. Core Features
4. Technology Stack
5. System Architecture
6. API Design
7. Database Design
8. Development Tasks
9. Testing Strategy
10. Risks
11. Future Improvements

Rules:
- Keep every section concise.
- Maximum 4 bullet points per section.
- Do not repeat information.
- Do not generate source code.
- Prefer beginner-friendly technologies.
- Do not invent existing repositories, URLs, companies, or APIs.
- Use Markdown.
"""
    )

    content = response.content

    return {
        "manager": content,

        "requirements": """
## Requirements

Requirements are included in the main engineering blueprint.
""",

        "research": """
## Research

Research stage skipped in Fast MVP mode.
""",

        "architecture": """
## Architecture

Architecture is included in the main engineering blueprint.
""",

        "planner": """
## Development Plan

Development tasks are included in the main engineering blueprint.
""",

        "review": """
## Review

Review is included in the main engineering blueprint.
"""
    }
from agno.agent import Agent
from agno.models.groq import Groq


def create_planner_agent():

    return Agent(
        name="Development Planner",
        model=Groq(id="openai/gpt-oss-120b"),
        instructions=[
            "You are a software development planner.",
            "Convert the project requirements and architecture into an implementation plan.",
            "Create development phases.",
            "Break work into small actionable tasks.",
            "Define dependencies between tasks.",
            "Include testing tasks.",
            "Prioritize the MVP before optional features.",
            "Return the result in clean Markdown."
        ],
        markdown=True,
    )
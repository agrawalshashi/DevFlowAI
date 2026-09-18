from agno.agent import Agent
from agno.models.groq import Groq


def create_manager_agent():

    return Agent(
        name="DevFlow Project Manager",

        model=Groq(
            id="openai/gpt-oss-20b"
        ),

        instructions=[
            "You are the DevFlow project manager.",
            "Create a concise engineering blueprint from the project idea.",
            "Cover: overview, requirements, features, architecture, tech stack, APIs, database, tasks, testing, risks, and future improvements.",
            "Keep every section short.",
            "Use maximum 5 bullet points per section.",
            "Avoid repetition, code, and long examples.",
            "Target output: under 1200 words.",
            "Use clean Markdown."
        ],

        markdown=True,
    )
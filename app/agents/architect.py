from agno.agent import Agent
from agno.models.groq import Groq


def create_architect_agent():

    return Agent(
        name="Software Architect",
        model=Groq(id="openai/gpt-oss-120b"),
        instructions=[
            "You are a software architect.",
            "Design a practical architecture based on the project idea and requirements.",
            "Include system components, data flow, folder structure, API design and database design.",
            "Keep the architecture beginner-friendly.",
            "Avoid unnecessary microservices and enterprise infrastructure.",
            "Clearly explain how components communicate.",
            "Return the result in clean Markdown."
        ],
        markdown=True,
    )
from agno.agent import Agent
from agno.models.groq import Groq


def create_researcher_agent():

    return Agent(
        name="Technology Researcher",
        model=Groq(id="openai/gpt-oss-120b"),
        instructions=[
            "You are a technology research analyst.",
            "Analyze the project requirements.",
            "Recommend practical technologies and libraries.",
            "Explain why each technology is appropriate.",
            "Prefer simple, beginner-friendly and maintainable choices.",
            "Do not over-engineer the project.",
            "Identify important technical considerations.",
            "Return the result in clean Markdown."
        ],
        markdown=True,
    )
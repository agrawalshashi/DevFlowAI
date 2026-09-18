from agno.agent import Agent
from agno.models.groq import Groq


def create_reviewer_agent():

    return Agent(
        name="Project Reviewer",
        model=Groq(id="openai/gpt-oss-120b"),
        instructions=[
            "You are a senior project reviewer.",
            "Review the proposed software project blueprint.",
            "Identify missing requirements, unnecessary complexity, technical risks and inconsistencies.",
            "Check whether the architecture matches the requirements.",
            "Check whether the development plan is realistic.",
            "Provide concrete improvements.",
            "End with a concise final recommendation for improving the blueprint.",
            "Return the result in clean Markdown."
        ],
        markdown=True,
    )
from dotenv import load_dotenv

from app.agents.requirements import create_requirements_agent


load_dotenv()


requirements_agent = create_requirements_agent()


response = requirements_agent.run(
    """
    I want to build an AI resume analyzer.

    The application should accept a resume and a job description
    and analyze how well the resume matches the job.
    """
)


print(response.content)
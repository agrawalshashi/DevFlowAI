from dotenv import load_dotenv
from app.agents.manager import create_manager_agent

load_dotenv()

manager = create_manager_agent()

response = manager.run(
    "I want to build an AI resume analyzer."
)

print(response.content)
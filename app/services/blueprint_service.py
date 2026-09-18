from app.agents.manager import create_manager_agent


def generate_blueprint(project_idea):
    manager = create_manager_agent()

    response = manager.run(
        f"""
        Create a complete engineering blueprint for this project:

        {project_idea}
        """
    )

    return response.content
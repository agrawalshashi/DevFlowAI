from flask import Blueprint, jsonify, request

from app.orchestration.workflow import run_devflow


api = Blueprint("api", __name__)


@api.get("/health")
def health():
    return jsonify({
        "status": "healthy",
        "project": "DevFlow AI"
    })


@api.post("/api/project/analyze")
def analyze_project():

    data = request.get_json(silent=True) or {}

    idea = data.get("idea", "").strip()

    if not idea:
        return jsonify({
            "status": "error",
            "error": "Project idea is required"
        }), 400

    try:

        blueprint = run_devflow(idea)

        return jsonify({
            "status": "success",
            "idea": idea,
            "blueprint": blueprint
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500


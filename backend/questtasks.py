from flask import Blueprint, abort, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import db, QuestTasks, QuestTasks

quest_tasks_bp = Blueprint('quest_tasks', __name__)


def quest_task_to_dict(quest_task: QuestTasks) -> dict:
    """Utility function to convert a QuestTasks object to a dictionary"""
    return {
        'id': quest_task.id,
        'id_quest': quest_task.id_quest,
        'name': quest_task.name,
        'description': quest_task.description,
        'media_ref': quest_task.time_restriction,
        'scoring_max': quest_task.scoring_max,
    }


def dict_to_quest_task(data: dict) -> QuestTasks:
    """Utility function to convert a dictionary to a QuestTasks object"""
    return QuestTasks(
        id_quest=data.get("id_quest"),
        name=data.get('name'),
        description=data.get('description', None),
        media_ref=data.get('media_ref', None),
        scoring_max=data.get('scoring_max', None)
    )


@quest_tasks_bp.route('/quest_tasks', methods=['GET'])
def get_quest_tasks():
    quest_tasks = QuestTasks.query.all()
    quest_tasks_list = [quest_task_to_dict(
        quest_task) for quest_task in quest_tasks]
    return jsonify(quest_tasks_list)


@quest_tasks_bp.route('/quests/<int:quest_id>/quest_tasks/', methods=['GET'])
def get_quest_tasks_by_quest(quest_id):
    quest_tasks = QuestTasks.query.filter_by(id_quest=quest_id)
    if not quest_tasks:
        return jsonify([])
    quest_tasks_list = [quest_task_to_dict(
        quest_task) for quest_task in quest_tasks]
    return jsonify(quest_tasks_list)


@quest_tasks_bp.route('/quest_tasks/<int:quest_task_id>', methods=['GET'])
def get_quest_task(quest_task_id):
    quest_task = QuestTasks.query.get(quest_task_id)
    if not quest_task:
        abort(404, description="Quest not found")
    return jsonify(quest_task_to_dict(quest_task))


@quest_tasks_bp.route('/quest_tasks', methods=['POST'], endpoint="create_quest")
@jwt_required
def create_quest():
    user_id = get_jwt_identity()

    data = request.get_json()

    if not data or 'name' not in data:
        abort(400, description="Missing required field: name")
    new_quest = dict_to_quest_task(data, user_id)
    db.session.add(new_quest)
    db.session.commit()
    return jsonify({"message": "Quest created successfully", "quest_task": quest_task_to_dict(new_quest)}), 201


@quest_tasks_bp.route('/quest_tasks/<int:quest_id>', methods=['PUT'], endpoint="update_quest")
@jwt_required
def update_quest(quest_id):
    user_id = get_jwt_identity()
    quest_task = QuestTasks.query.get(quest_id)

    if not quest_task:
        abort(404, description="Quest not found.")

    if not quest_task.id_user_author == user_id:
        abort(403, description="You can only edit your own quest_tasks.")
    data = request.get_json()

    quest_task.name = data.get('name', quest_task.name)
    quest_task.description = data.get('description', quest_task.description),
    quest_task.time_restriction = data.get(
        'time_restriction', quest_task.time_restriction)

    db.session.commit()
    return jsonify({'message': 'Quest updated successfully', 'quest_task': quest_task_to_dict(quest_task)}), 200


@quest_tasks_bp.route('/quest_tasks/<int:quest_id>', methods=['DELETE'], endpoint="delete_quest")
@jwt_required
def delete_quest(quest_id):
    user_id = get_jwt_identity()
    quest_task = QuestTasks.query.get(quest_id)

    if not quest_task:
        abort(404, description="Quest not found.")

    if not quest_task.id_user_author == user_id:
        abort(403, description="You can only delete your own quest_tasks.")

    db.session.delete(quest_task)
    db.session.commit()
    return jsonify({'message': 'Quest deleted successfully'}), 200

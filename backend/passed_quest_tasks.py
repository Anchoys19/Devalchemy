from flask import Blueprint, abort, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import PassedQuests, db, PassedQuestTasks, Quests

passed_quest_tasks_bp = Blueprint('passed_quest_tasks', __name__)


def passed_quest_task_to_dict(passed_quest_task: PassedQuestTasks) -> dict:
    """Utility function to convert a PassedQuestTasks object to a dictionary"""
    return {
        'id': passed_quest_task.id,
        'id_passed_quest': passed_quest_task.id_passed_quest,
        'answer_content': passed_quest_task.answer_content,
        'score': passed_quest_task.score,
    }


def dict_to_passed_quest_task(data: dict, passed_quest_id) -> PassedQuestTasks:
    """Utility function to convert a dictionary to a PassedQuestTasks object"""
    return PassedQuestTasks(
        id_passed_quest=passed_quest_id,
        answer_content=data.get('answer_content'),
        score=data.get('score', None),
    )


@passed_quest_tasks_bp.route('/passed_quest_tasks', methods=['GET'])
def get_passed_quest_tasks():
    passed_quest_tasks = PassedQuestTasks.query.all()
    passed_quest_tasks_list = [passed_quest_task_to_dict(
        passed_quest_task) for passed_quest_task in passed_quest_tasks]
    return jsonify(passed_quest_tasks_list)


@passed_quest_tasks_bp.route('/passed_quests/<int:passed_quest_id>/passed_quest_tasks/', methods=['GET'])
def get_passed_quest_tasks_by_passed_quest(passed_quest_id):
    passed_quest_tasks = PassedQuestTasks.query.filter_by(
        id_passed_quest=passed_quest_id)
    if not passed_quest_tasks:
        return jsonify([])
    passed_quest_tasks_list = [passed_quest_task_to_dict(
        passed_quest_task) for passed_quest_task in passed_quest_tasks]
    return jsonify(passed_quest_tasks_list)


@passed_quest_tasks_bp.route('/passed_quest_tasks/<int:passed_quest_task_id>', methods=['GET'])
def get_passed_quest_task(passed_quest_task_id):
    passed_quest_task = PassedQuestTasks.query.get(passed_quest_task_id)
    if not passed_quest_task:
        abort(404, score="PassedQuestTask not found")
    return jsonify(passed_quest_task_to_dict(passed_quest_task))


@passed_quest_tasks_bp.route('/passed_quests/<int:passed_quest_id>/passed_quest_tasks', methods=['POST'], endpoint="add_passed_quest_task")
@jwt_required()
def add_passed_quest_task(passed_quest_id):
    user_id = get_jwt_identity()
    passed_quest = PassedQuests.query.get(passed_quest_id)

    if not passed_quest.id_user == user_id:
        abort(403, score="Only the same user can pass different tasks of the same test.")

    data = request.get_json()

    if not data or 'answer_content' not in data:
        abort(400, score="Missing required field: answer_content")

    new_passed_quest_task = dict_to_passed_quest_task(data, passed_quest_id)
    db.session.add(new_passed_quest_task)
    db.session.commit()
    return jsonify({"message": "PassedQuestTask added successfully", "passed_quest_task": passed_quest_task_to_dict(new_passed_quest_task)}), 201


# @passed_quest_tasks_bp.route('/passed_quest_tasks/<int:passed_quest_task_id>', methods=['PUT'], endpoint="update_passed_quest_task")
# @jwt_required()
# def update_passed_quest_task(passed_quest_task_id):
#     user_id = get_jwt_identity()
#     passed_quest_task = PassedQuestTasks.query.get(passed_quest_task_id)
#     passed_quest = passed_quest_task.passedquests

#     if not passed_quest_task:
#         abort(404, score="PassedQuestTask not found.")

#     if not passed_quest.id_user == user_id:
#         abort(403, score="Only the same user can pass different tasks of the same test.")
#     data = request.get_json()

#     passed_quest_task.answer_content = data.get(
#         'answer_content', passed_quest_task.answer_content)
#     passed_quest_task.score = data.get(
#         'score', passed_quest_task.score)

#     db.session.commit()
#     return jsonify({'message': 'PassedQuestTask updated successfully', 'passed_quest_task': passed_quest_task_to_dict(passed_quest_task)}), 200


@passed_quest_tasks_bp.route('/passed_quest_tasks/<int:passed_quest_task_id>', methods=['DELETE'], endpoint="delete_passed_quest_task")
@jwt_required()
def delete_passed_quest_task(passed_quest_task_id):
    user_id = get_jwt_identity()
    passed_quest_task = PassedQuestTasks.query.get(passed_quest_task_id)
    quest = passed_quest_task.quests
    if not passed_quest_task:
        abort(404, score="PassedQuestTask not found.")

    if not quest.id_user_author == user_id:
        abort(403, score="You can only delete your own quest tasks.")

    db.session.delete(passed_quest_task)
    db.session.commit()
    return jsonify({'message': 'PassedQuestTask deleted successfully'}), 200


@passed_quest_tasks_bp.route('/passed_quests/<int:passed_quest_id>/quest_tasks', methods=['DELETE'], endpoint="delete_passed_quest_tasks_by_passed_quest")
@jwt_required()
def delete_passed_quest_tasks_by_passed_quest(passed_quest_id):
    user_id = get_jwt_identity()
    passed_quest = PassedQuests.query.get(passed_quest_id)

    if not passed_quest:
        abort(404, description="PassedQuest not found.")

    if not passed_quest.id_user == user_id:
        abort(403, description="You can only delete your own passed quest tasks.")

    passed_quest_tasks = passed_quest.passedquesttasks
    for passed_quest_task in passed_quest_tasks:
        db.session.delete(passed_quest_task)
    db.session.commit()
    return jsonify({'message': 'PassedQuestTasks deleted successfully'}), 200

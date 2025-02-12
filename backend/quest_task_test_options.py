from flask import Blueprint, abort, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import QuestTasks, db, QuestTaskTestOptions, Quests

quest_task_test_options_bp = Blueprint('quest_task_test_options', __name__)


def quest_task_test_option_to_dict(quest_task_test_option: QuestTaskTestOptions) -> dict:
    """Utility function to convert a QuestTaskTestOptions object to a dictionary"""
    return {
        'id': quest_task_test_option.id,
        'id_quest_task': quest_task_test_option.id_quest_task,
        'option_text': quest_task_test_option.option_text,
        'correct_option': quest_task_test_option.correct_option,
    }


def dict_to_quest_task_test_option(data: dict, quest_task_id) -> QuestTaskTestOptions:
    """Utility function to convert a dictionary to a QuestTaskTestOptions object"""
    return QuestTaskTestOptions(
        id_quest_task=quest_task_id,
        option_text=data.get('option_text'),
        correct_option=data.get('correct_option', False),
    )


@quest_task_test_options_bp.route('/quest_task_test_options', methods=['GET'])
def get_quest_task_test_options():
    quest_task_test_options = QuestTaskTestOptions.query.all()
    quest_task_test_options_list = [quest_task_test_option_to_dict(
        quest_task_test_option) for quest_task_test_option in quest_task_test_options]
    return jsonify(quest_task_test_options_list)


@quest_task_test_options_bp.route('/quests_tasks/<int:quest_task_id>/quest_task_test_options/', methods=['GET'])
def get_quest_task_test_options_by_quest_task(quest_task_id):
    quest_task_test_options = QuestTaskTestOptions.query.filter_by(
        id_quest_task=quest_task_id)
    if not quest_task_test_options:
        return jsonify([])
    quest_task_test_options_list = [quest_task_test_option_to_dict(
        quest_task_test_option) for quest_task_test_option in quest_task_test_options]
    return jsonify(quest_task_test_options_list)


@quest_task_test_options_bp.route('/quest_task_test_options/<int:quest_task_test_option_id>', methods=['GET'])
def get_quest_task_test_option(quest_task_test_option_id):
    quest_task_test_option = QuestTaskTestOptions.query.get(
        quest_task_test_option_id)
    if not quest_task_test_option:
        abort(404, description="QuestTaskTestOption not found")
    return jsonify(quest_task_test_option_to_dict(quest_task_test_option))


@quest_task_test_options_bp.route('/quest_tasks/<int:quest_task_id>/quest_task_test_options', methods=['POST'], endpoint="create_quest_task_test_option")
@jwt_required()
def create_quest_task_test_option(quest_task_id):
    user_id = get_jwt_identity()
    quest_task = QuestTasks.query.get(quest_task_id)
    quest = quest_task.quests

    if not quest.id_user_author == user_id:
        abort(403, description="You can only edit your own quest tasks.")

    data = request.get_json()

    if not data or 'option_text' not in data:
        abort(400, description="Missing required field: option_text")

    new_quest_task_test_option = dict_to_quest_task_test_option(
        data, quest_task_id)
    db.session.add(new_quest_task_test_option)
    db.session.commit()
    return jsonify({"message": "QuestTaskTestOption created successfully", "quest_task_test_option": quest_task_test_option_to_dict(new_quest_task_test_option)}), 201


@quest_task_test_options_bp.route('/quest_task_test_options/<int:quest_task_test_option_id>', methods=['PUT'], endpoint="update_quest_task_test_option")
@jwt_required()
def update_quest_task_test_option(quest_task_test_option_id):
    user_id = get_jwt_identity()
    quest_task_test_option = QuestTaskTestOptions.query.get(
        quest_task_test_option_id)
    quest_task = quest_task_test_option.questtasks
    quest = quest_task.quests

    if not quest_task_test_option:
        abort(404, description="QuestTaskTestOption not found.")

    if not quest.id_user_author == user_id:
        abort(403, description="You can only edit your own quest tasks.")
    data = request.get_json()

    quest_task_test_option.option_text = data.get(
        'option_text', quest_task_test_option.option_text)
    quest_task_test_option.correct_option = data.get(
        'correct_option', quest_task_test_option.correct_option)
    db.session.commit()
    return jsonify({'message': 'QuestTaskTestOption updated successfully', 'quest_task_test_option': quest_task_test_option_to_dict(quest_task_test_option)}), 200


@quest_task_test_options_bp.route('/quest_task_test_options/<int:quest_task_test_option_id>', methods=['DELETE'], endpoint="delete_quest_task_test_option")
@jwt_required()
def delete_quest_task_test_option(quest_task_test_option_id):
    user_id = get_jwt_identity()
    quest_task_test_option = QuestTaskTestOptions.query.get(
        quest_task_test_option_id)
    quest_task = quest_task_test_option.questtasks
    quest = quest_task.quests
    if not quest_task_test_option:
        abort(404, description="QuestTaskTestOption not found.")

    if not quest.id_user_author == user_id:
        abort(403, description="You can only delete your own quest task options.")

    db.session.delete(quest_task_test_option)
    db.session.commit()
    return jsonify({'message': 'QuestTaskTestOption deleted successfully'}), 200


@quest_task_test_options_bp.route('/quest_task/<int:quest_task_id>/quest_task_test_options', methods=['DELETE'], endpoint="delete_quest_task_test_options_by_quest_task")
@jwt_required()
def delete_quest_task_test_options_by_quest(quest_task_id):
    user_id = get_jwt_identity()
    quest_task = QuestTasks.query.get(
        quest_task_id)
    quest = quest_task.quests
    if not quest_task:
        abort(404, description="QuestTask not found.")

    if not quest.id_user_author == user_id:
        abort(403, description="You can only delete your own quest task options.")

    quest_task_test_options = quest_task.questtasktestoptions
    for quest_task_test_option in quest_task_test_options:
        db.session.delete(quest_task_test_option)
    db.session.commit()
    return jsonify({'message': 'QuestTaskTestOptions deleted successfully'}), 200

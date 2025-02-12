from flask import Blueprint, abort, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import db, PassedQuests, Quests

passed_quests_bp = Blueprint('passed_quests', __name__)


def passed_quest_to_dict(passed_quest: PassedQuests) -> dict:
    """Utility function to convert a PassedQuests object to a dictionary"""
    return {
        'id': passed_quest.id,
        'id_user': passed_quest.id_user,
        'id_quest': passed_quest.id_user,
        'time_used': passed_quest.time_used,
    }


def dict_to_passed_quest(data: dict, user_id, quest_id) -> PassedQuests:
    """Utility function to convert a dictionary to a PassedQuests object"""
    return PassedQuests(
        id_user=user_id,
        id_quest=quest_id,
        time_used=data.get('time_used', None)
    )


@passed_quests_bp.route('/passed_quests', methods=['GET'])
def get_passed_quests():
    passed_quests = PassedQuests.query.all()
    passed_quests_list = [passed_quest_to_dict(
        passed_quest) for passed_quest in passed_quests]
    return jsonify(passed_quests_list)


@passed_quests_bp.route('/user/passed_quests/', methods=['GET'])
@jwt_required()
def get_passed_quests_by_current_user():
    user_id = get_jwt_identity()
    passed_quests = PassedQuests.query.filter_by(id_user=user_id)
    if not passed_quests:
        return jsonify([])
    passed_quests_list = [passed_quest_to_dict(
        passed_quest) for passed_quest in passed_quests]
    return jsonify(passed_quests_list)


@passed_quests_bp.route('/users/<int:user_id>/passed_quests/', methods=['GET'])
def get_passed_quests_by_user(user_id):
    passed_quests = PassedQuests.query.filter_by(id_user=user_id)
    if not passed_quests:
        return jsonify([])
    passed_quests_list = [passed_quest_to_dict(
        passed_quest) for passed_quest in passed_quests]
    return jsonify(passed_quests_list)


@passed_quests_bp.route('/quests/<int:quest_id>/passed_quests/', methods=['GET'])
def get_passed_quests_by_quest(quest_id):
    passed_quests = PassedQuests.query.filter_by(id_quest=quest_id)
    if not passed_quests:
        return jsonify([])
    passed_quests_list = [passed_quest_to_dict(
        passed_quest) for passed_quest in passed_quests]
    return jsonify(passed_quests_list)


@passed_quests_bp.route('/passed_quests/<int:passed_quest_id>', methods=['GET'])
def get_passed_quest(passed_quest_id):
    passed_quest = PassedQuests.query.get(passed_quest_id)
    if not passed_quest:
        abort(404, description="PassedQuest not found")
    return jsonify(passed_quest_to_dict(passed_quest))


@passed_quests_bp.route('/quests/<int:quest_id>/pass', methods=['POST'], endpoint="create_passed_quest")
@jwt_required()
def create_passed_quest(quest_id):
    user_id = get_jwt_identity()
    quest = Quests.query.filter_by(id_quest=quest_id)
    data = request.get_json()

    if not quest:
        abort(404, description="Quest not found")

    new_passed_quest = dict_to_passed_quest(data, user_id, quest_id)
    db.session.add(new_passed_quest)
    db.session.commit()
    return jsonify({"message": "PassedQuest created successfully", "passed_quest": passed_quest_to_dict(new_passed_quest)}), 201


# @passed_quests_bp.route('/passed_quests/<int:passed_quest_id>', methods=['PUT'], endpoint="update_passed_quest")
# @jwt_required()
# def update_passed_quest(passed_quest_id):
#     user_id = get_jwt_identity()
#     passed_quest = PassedQuests.query.get(passed_quest_id)

#     if not passed_quest:
#         abort(404, description="PassedQuest not found.")

#     if not passed_quest.id_user == user_id:
#         abort(403, description="You can only edit your own passed_quests.")
#     data = request.get_json()

#     passed_quest.time_used = data.get('time_used', passed_quest.time_used)

#     db.session.commit()
#     return jsonify({'message': 'PassedQuest updated successfully', 'passed_quest': passed_quest_to_dict(passed_quest)}), 200


@passed_quests_bp.route('/passed_quests/<int:passed_quest_id>', methods=['DELETE'], endpoint="delete_passed_quest")
@jwt_required()
def delete_passed_quest(passed_quest_id):
    user_id = get_jwt_identity()
    passed_quest = PassedQuests.query.get(passed_quest_id)

    if not passed_quest:
        abort(404, description="PassedQuest not found.")

    if not passed_quest.id_user == user_id:
        abort(403, description="You can only delete your own passed quests.")

    db.session.delete(passed_quest)
    db.session.commit()
    return jsonify({'message': 'PassedQuest deleted successfully'}), 200

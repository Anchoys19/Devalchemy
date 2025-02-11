from flask import Blueprint, abort, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import db, Quests, QuestReviews, QuestTasks, QuestTaskTestOptions, PassedQuests, PassedQuestTasks

quests_bp = Blueprint('quests', __name__)


def quest_to_dict(quest: Quests) -> dict:
    """Utility function to convert a Quests object to a dictionary"""
    # TODO: add ratings,quests?
    return {
        'id': quest.id,
        'id_user_author': quest.id_user_author,
        'name': quest.name,
        'description': quest.description,
        'time_restriction': quest.time_restriction,
    }


def dict_to_quest(data: dict, user_id) -> Quests:
    """Utility function to convert a dictionary to a Quests object"""
    return Quests(
        id_user_author=user_id,
        name=data.get('name'),
        description=data.get('description', None),
        time_restriction=data.get('time_restriction', None)
    )


@quests_bp.route('/quests', methods=['GET'])
def get_quests():
    quests = Quests.query.all()
    quests_list = [quest_to_dict(quest) for quest in quests]
    return jsonify(quests_list)


@quests_bp.route('/quests/user/', methods=['GET'])
@jwt_required
def get_quests_by_current_user():
    user_id = get_jwt_identity()
    quests = Quests.query.filter_by(id_user_author=user_id)
    if not quests:
        abort(404, description="User doesn't have quests")
    quests_list = [quest_to_dict(quest) for quest in quests]
    return jsonify(quests_list)


@quests_bp.route('/quests/user/<int:user_id>', methods=['GET'])
def get_quests_by_user(user_id):
    quests = Quests.query.filter_by(id_user_author=user_id)
    if not quests:
        abort(404, description="User doesn't have quests")
    quests_list = [quest_to_dict(quest) for quest in quests]
    return jsonify(quests_list)


@quests_bp.route('/quests/<int:quest_id>', methods=['GET'])
def get_quest(quest_id):
    quest = Quests.query.get(quest_id)
    if not quest:
        abort(404, description="Quest not found")
    return jsonify(quest_to_dict(quest))


@quests_bp.route('/quests', methods=['POST'])
@jwt_required
def create_quest():
    user_id = get_jwt_identity()

    data = request.get_json()

    if not data or 'name' not in data:
        abort(400, description="Missing required field: name")
    new_quest = dict_to_quest(data, user_id)
    db.session.add(new_quest)
    db.session.commit()
    return jsonify({"message": "Quest created successfully", "quest": quest_to_dict(new_quest)}), 201


@quests_bp.route('/quests/<int:quest_id>', methods=['PUT'])
@jwt_required
def update_quest(quest_id):
    quest = Quests.query.get(quest_id)
    data = request.get_json()
    for key, value in data.items():
        setattr(quest, key, value)
    db.session.commit()
    return jsonify(quest.to_dict())


@quests_bp.route('/quests/<int:quest_id>', methods=['DELETE'])
def delete_quest(quest_id):
    quest = Quests.query.get_or_404(quest_id)
    db.session.delete(quest)
    db.session.commit()
    return jsonify({'message': 'Quests deleted'})

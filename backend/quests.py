from flask import Blueprint, request, jsonify
from models import db, Quests, QuestReviews, QuestTasks, QuestTaskTestOptions, PassedQuests, PassedQuestTasks

quests_bp = Blueprint('quests', __name__)


def quest_to_dict(quest: Quests) -> dict:
    """Utility function to convert a Quest object to a dictionary"""
    # TODO: add ratings,quests?
    return {
        'id': quest.id,
        'id_user_author': quest.id_user_author,
        'name': quest.name,
        'description': quest.description,
        'time_restriction': quest.time_restriction,
    }


def dict_to_user(data: dict) -> Quests:
    """Utility function to convert a dictionary to a Quests object"""
    return Quests(
        id_user_author=data.get('id_user_author'),
        name=data.get('name'),
        description=data.get('description', None),
        time_restriction=data.get('time_restriction', None)
    )


@quests_bp.route('/quests', methods=['GET'])
def get_quests():
    quests = Quest.query.all()
    return jsonify([q.to_dict() for q in quests])


@quests_bp.route('/quests/<int:quest_id>', methods=['GET'])
def get_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    return jsonify(quest.to_dict())


@quests_bp.route('/quests', methods=['POST'])
def create_quest():
    data = request.json
    new_quest = Quest(**data)
    db.session.add(new_quest)
    db.session.commit()
    return jsonify(new_quest.to_dict()), 201


@quests_bp.route('/quests/<int:quest_id>', methods=['PUT'])
def update_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    data = request.json
    for key, value in data.items():
        setattr(quest, key, value)
    db.session.commit()
    return jsonify(quest.to_dict())


@quests_bp.route('/quests/<int:quest_id>', methods=['DELETE'])
def delete_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    db.session.delete(quest)
    db.session.commit()
    return jsonify({'message': 'Quest deleted'})

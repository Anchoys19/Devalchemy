from flask import Blueprint, abort, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import db, QuestReviews, Quests

quest_reviews_bp = Blueprint('quest_reviews', __name__)


def quest_review_to_dict(quest_review: QuestReviews) -> dict:
    """Utility function to convert a QuestReviews object to a dictionary"""
    return {
        'id': quest_review.id,
        'id_quest': quest_review.id_quest,
        'id_user_author': quest_review.id_user_author,
        'title': quest_review.title,
        'description': quest_review.description,
        'rating': quest_review.rating,
    }


def dict_to_quest_review(data: dict, quest_id, author_id) -> QuestReviews:
    """Utility function to convert a dictionary to a QuestReviews object"""
    return QuestReviews(
        id_quest=quest_id,
        id_user_author=author_id,
        title=data.get('title'),
        description=data.get('description', None),
        rating=data.get('rating'),
    )


@quest_reviews_bp.route('/quest_reviews', methods=['GET'])
def get_quest_reviews():
    quest_reviews = QuestReviews.query.all()
    quest_reviews_list = [quest_review_to_dict(
        quest_review) for quest_review in quest_reviews]
    return jsonify(quest_reviews_list)


@quest_reviews_bp.route('/quests/<int:quest_id>/quest_reviews/', methods=['GET'])
def get_quest_reviews_by_quest(quest_id):
    quest_reviews = QuestReviews.query.filter_by(id_quest=quest_id)
    if not quest_reviews:
        return jsonify([])
    quest_reviews_list = [quest_review_to_dict(
        quest_review) for quest_review in quest_reviews]
    return jsonify(quest_reviews_list)


@quest_reviews_bp.route('/quest_reviews/<int:quest_review_id>', methods=['GET'])
def get_quest_review(quest_review_id):
    quest_review = QuestReviews.query.get(quest_review_id)
    if not quest_review:
        abort(404, description="QuestReview not found")
    return jsonify(quest_review_to_dict(quest_review))


@quest_reviews_bp.route('/quests/<int:quest_id>/quest_reviews', methods=['POST'], endpoint="create_quest_review")
@jwt_required()
def create_quest_review(quest_id):
    user_id = get_jwt_identity()
    quest = Quests.query.get(quest_id)

    if quest.id_user_author == user_id:
        abort(403, description="You cannot review your own quests.")

    data = request.get_json()

    if not data or 'title' not in data or 'rating' not in data:
        abort(400, description="Missing required fields: title, rating")

    new_quest_review = dict_to_quest_review(data, quest_id, user_id)
    db.session.add(new_quest_review)
    db.session.commit()
    return jsonify({"message": "QuestReview created successfully", "quest_review": quest_review_to_dict(new_quest_review)}), 201


@quest_reviews_bp.route('/quest_reviews/<int:quest_review_id>', methods=['PUT'], endpoint="update_quest_review")
@jwt_required()
def update_quest_review(quest_review_id):
    user_id = get_jwt_identity()
    quest_review = QuestReviews.query.get(quest_review_id)

    if not quest_review:
        abort(404, description="QuestReview not found.")

    if not quest_review.id_user_author == user_id:
        abort(403, description="You can only edit your own reviews.")
    data = request.get_json()

    quest_review.title = data.get('title', quest_review.title)
    quest_review.description = data.get(
        'description', quest_review.description),
    quest_review.rating = data.get(
        'rating', quest_review.rating)

    db.session.commit()
    return jsonify({'message': 'QuestReview updated successfully', 'quest_review': quest_review_to_dict(quest_review)}), 200


@quest_reviews_bp.route('/quest_reviews/<int:quest_review_id>', methods=['DELETE'], endpoint="delete_quest_review")
@jwt_required()
def delete_quest_review(quest_review_id):
    user_id = get_jwt_identity()
    quest_review = QuestReviews.query.get(quest_review_id)
    if not quest_review:
        abort(404, description="Quest not found.")

    if not quest_review.id_user_author == user_id:
        abort(403, description="You can only delete your own reviews.")

    db.session.delete(quest_review)
    db.session.commit()
    return jsonify({'message': 'QuestReview deleted successfully'}), 200

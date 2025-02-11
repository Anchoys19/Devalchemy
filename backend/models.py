from typing import List

from sqlalchemy import CheckConstraint, Column, DECIMAL, ForeignKeyConstraint, Index, Integer, String, VARBINARY
from sqlalchemy.dialects.mysql import BIT
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship
from sqlalchemy.orm.base import Mapped

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'
    __table_args__ = (
        Index('email_UNIQUE', 'email', unique=True),
        Index('nickname_UNIQUE', 'nickname', unique=True)
    )

    id = mapped_column(Integer, primary_key=True)
    nickname = mapped_column(String(255), nullable=False)
    email = mapped_column(String(255), nullable=False)
    password_hash = mapped_column(VARBINARY(255))
    gender = mapped_column(String(15))
    phone_number = mapped_column(String(15))
    profile_pic_ref = mapped_column(String(255))

    quests: Mapped[List['Quests']] = relationship(
        'Quests', uselist=True, back_populates='users')
    socialmediaaccount: Mapped[List['SocialMediaAccount']] = relationship(
        'SocialMediaAccount', uselist=True, back_populates='users')
    passedquests: Mapped[List['PassedQuests']] = relationship(
        'PassedQuests', uselist=True, back_populates='users')
    questreviews: Mapped[List['QuestReviews']] = relationship(
        'QuestReviews', uselist=True, back_populates='users')


class Quests(Base):
    __tablename__ = 'quests'
    __table_args__ = (
        ForeignKeyConstraint(['id_user_author'], [
                             'users.id'], name='quests_ibfk_1'),
        Index('id_user_author', 'id_user_author')
    )

    id = mapped_column(Integer, primary_key=True)
    id_user_author = mapped_column(Integer, nullable=False)
    name = mapped_column(String(100), nullable=False)
    description = mapped_column(String(500))
    time_restriction = mapped_column(DECIMAL(5, 2))

    users: Mapped['Users'] = relationship('Users', back_populates='quests')
    passedquests: Mapped[List['PassedQuests']] = relationship(
        'PassedQuests', uselist=True, back_populates='quests')
    questreviews: Mapped[List['QuestReviews']] = relationship(
        'QuestReviews', uselist=True, back_populates='quests')
    questtasks: Mapped[List['QuestTasks']] = relationship(
        'QuestTasks', uselist=True, back_populates='quests')


class SocialMediaAccount(Base):
    __tablename__ = 'socialmediaaccount'
    __table_args__ = (
        ForeignKeyConstraint(['id_user'], ['users.id'],
                             name='socialmediaaccount_ibfk_1'),
        Index('id_user', 'id_user')
    )

    id = mapped_column(Integer, primary_key=True)
    social_media_name = mapped_column(String(50), nullable=False)
    id_user = mapped_column(Integer, nullable=False)

    users: Mapped['Users'] = relationship(
        'Users', back_populates='socialmediaaccount')


class PassedQuests(Base):
    __tablename__ = 'passedquests'
    __table_args__ = (
        ForeignKeyConstraint(['id_quest'], ['quests.id'],
                             name='passedquests_ibfk_1'),
        ForeignKeyConstraint(['id_user'], ['users.id'],
                             name='passedquests_ibfk_2'),
        Index('id_quest', 'id_quest'),
        Index('id_user', 'id_user')
    )

    id = mapped_column(Integer, primary_key=True)
    id_quest = mapped_column(Integer, nullable=False)
    id_user = mapped_column(Integer, nullable=False)
    time_used = mapped_column(DECIMAL(5, 2))

    quests: Mapped['Quests'] = relationship(
        'Quests', back_populates='passedquests')
    users: Mapped['Users'] = relationship(
        'Users', back_populates='passedquests')
    passedquesttasks: Mapped[List['PassedQuestTasks']] = relationship(
        'PassedQuestTasks', uselist=True, back_populates='passedquests')


class QuestReviews(Base):
    __tablename__ = 'questreviews'
    __table_args__ = (
        CheckConstraint('(`rating` between 1 and 10)',
                        name='questreviews_chk_1'),
        ForeignKeyConstraint(['id_quest'], ['quests.id'],
                             name='questreviews_ibfk_1'),
        ForeignKeyConstraint(['id_user_author'], [
                             'users.id'], name='questreviews_ibfk_2'),
        Index('id_quest', 'id_quest'),
        Index('id_user_author', 'id_user_author')
    )

    id = mapped_column(Integer, primary_key=True)
    id_quest = mapped_column(Integer, nullable=False)
    id_user_author = mapped_column(Integer, nullable=False)
    title = mapped_column(String(50), nullable=False)
    rating = mapped_column(Integer, nullable=False)
    description = mapped_column(String(500))

    quests: Mapped['Quests'] = relationship(
        'Quests', back_populates='questreviews')
    users: Mapped['Users'] = relationship(
        'Users', back_populates='questreviews')


class QuestTasks(Base):
    __tablename__ = 'questtasks'
    __table_args__ = (
        ForeignKeyConstraint(['id_quest'], ['quests.id'],
                             name='questtasks_ibfk_1'),
        Index('id_quest', 'id_quest')
    )

    id = mapped_column(Integer, primary_key=True)
    id_quest = mapped_column(Integer, nullable=False)
    name = mapped_column(String(100), nullable=False)
    description = mapped_column(String(500))
    media_ref = mapped_column(String(255))
    scoring_max = mapped_column(Integer)

    quests: Mapped['Quests'] = relationship(
        'Quests', back_populates='questtasks')
    questtasktestoptions: Mapped[List['QuestTaskTestOptions']] = relationship(
        'QuestTaskTestOptions', uselist=True, back_populates='questtasks')


class PassedQuestTasks(Base):
    __tablename__ = 'passedquesttasks'
    __table_args__ = (
        CheckConstraint('(`score` >= 0)', name='passedquesttasks_chk_1'),
        ForeignKeyConstraint(['id_passed_quest'], [
                             'passedquests.id'], name='passedquesttasks_ibfk_1'),
        Index('id_passed_quest', 'id_passed_quest')
    )

    id = mapped_column(Integer, primary_key=True)
    id_passed_quest = mapped_column(Integer, nullable=False)
    answer_content = mapped_column(String(500), nullable=False)
    score = mapped_column(Integer)

    passedquests: Mapped['PassedQuests'] = relationship(
        'PassedQuests', back_populates='passedquesttasks')


class QuestTaskTestOptions(Base):
    __tablename__ = 'questtasktestoptions'
    __table_args__ = (
        ForeignKeyConstraint(['id_quest_task'], [
                             'questtasks.id'], name='questtasktestoptions_ibfk_1'),
        Index('id_quest_task', 'id_quest_task')
    )

    id = mapped_column(Integer, primary_key=True)
    id_quest_task = mapped_column(Integer, nullable=False)
    correct_option = mapped_column(BIT(1), nullable=False)
    option_text = mapped_column(String(50), nullable=False)

    questtasks: Mapped['QuestTasks'] = relationship(
        'QuestTasks', back_populates='questtasktestoptions')

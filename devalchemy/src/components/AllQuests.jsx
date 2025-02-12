import React from "react";
import { Link } from "react-router-dom";
import "../css/AllQuests.css"

const quests = [
    { id: 1, title: "Місія в пустелі", description: "Виживіть у суворих умовах." },
    { id: 2, title: "Таємниці старого замку", description: "Досліджуйте покинутий замок." },
    { id: 3, title: "Загублений скарб", description: "Знайдіть прихований скарб." },
];

const AllQuests = () => {
    return (
        <div className="quests-container">
            <h1 className="quests-title">All Quests</h1>
            <ul className="quests-list">
                {quests.map((quest, index) => (
                    <li key={quest.id} className="quest-item">
                        <span className="quest-number">{index + 1}</span>
                        <div className="quest-image"></div>
                        <div className="quest-info">
                            <h2 className="quest-title">{quest.title}</h2>
                            <p className="quest-description">{quest.description}</p>
                        </div>
                        <Link to={`/quests/${quest.id}`}>
                            <button className="quest-complete">Play</button>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/" className="go-back">Go Back</Link>
        </div>
    );
};

export default AllQuests;

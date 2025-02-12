import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/AllQuests.css";

const AllQuests = () => {
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const response = await fetch("http://localhost:5000/quests");
                const data = await response.json();
                if (response.ok) {
                    setQuests(data);
                } else {
                    console.error("Помилка отримання квестів:", data);
                }
            } catch (error) {
                console.error("Помилка сервера:", error);
            }
        };

        fetchQuests();
    }, []);

    return (
        <div className="quests-container">
            <h1 className="quests-title">All Quests</h1>
            <ul className="quests-list">
                {quests.map((quest, index) => (
                    <li key={quest.id} className="quest-item">
                        <span className="quest-number">{index + 1}</span>
                        <div className="quest-image"></div>
                        <div className="quest-info">
                            <h2 className="quest-title">{quest.name}</h2>
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

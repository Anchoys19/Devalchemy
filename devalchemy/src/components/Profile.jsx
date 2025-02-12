import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css"

const Profile = () => {
    const navigate = useNavigate();

    const user = {
        avatar: "https://via.placeholder.com/150",
        nickname: "QuestMaster42",
        email: "questmaster42@example.com",
        quests: [
            { id: 1, name: "The Lost Treasure", description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
            { id: 2, name: "Mystery of the Enchanted Forest", description: "2024-02-05" },
            { id: 3, name: "Escape from the Ancient Temple", description: "2024-01-28" },
        ],
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.profile_pic_ref} alt="User Avatar" className="avatar" />
                <h2>{user.nickname}</h2>
                <p>{user.email}</p>
            </div>
            <div className="quest-history">
                <h3>Quest History</h3>
                {user.quests.length > 0 ? (
                    <ul>
                        {user.quests.map((quest) => (
                            <li key={quest.id}>
                                <span className="quest-title">{quest.name}</span>
                                <span className="quest-description">{quest.description}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No completed quests yet.</p>
                )}
            </div>
            <button className="back-btn" onClick={() => navigate("/")}>Back to Menu</button>
        </div>
    );
};

export default Profile;

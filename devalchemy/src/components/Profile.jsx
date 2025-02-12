import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const accessToken = localStorage.getItem("accessToken"); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();
                setUser(data); // Зберігаємо дані профілю
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.profile_pic_ref || "https://picsum.photos/150"} alt="User Avatar" className="avatar" />
                <h2>{user.nickname}</h2>
                <p>{user.email}</p>
            </div>
            <div className="quest-history">
                <h3>Quest History</h3>
                {user.quests && user.quests.length > 0 ? (
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

import React from "react";
import { Link } from "react-router-dom";

const quests = [
    { id: 1, title: "Місія в пустелі", description: "Виживіть у суворих умовах." },
    { id: 2, title: "Таємниці старого замку", description: "Досліджуйте покинутий замок." },
    { id: 3, title: "Загублений скарб", description: "Знайдіть прихований скарб." },
];

const AllQuests = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Усі квести</h1>
            <ul>
                {quests.map((quest) => (
                    <li key={quest.id} className="mb-2">
                        <Link to={`/quests/${quest.id}`} className="text-blue-500 hover:underline">
                            {quest.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/" className="text-blue-500 mt-4 inline-block">Повернутися на головну</Link>
        </div>
    );
};

export default AllQuests;

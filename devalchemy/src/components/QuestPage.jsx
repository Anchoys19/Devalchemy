import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const quests = [
    { id: 1, title: "Quest 1", timeLimit: 600, tasks: [
            { id: 1, type: "choice", question: "Choose the right answer:", options: ["A", "B", "C"], correct: "A" },
            { id: 2, type: "text", question: "Describe your experience:" }
        ]},
    { id: 2, title: "Quest 2", timeLimit: 900, tasks: [
            { id: 1, type: "choice", question: "Select a color:", options: ["Red", "Green", "Blue"], correct: "Green" },
            { id: 2, type: "text", question: "Write about your favorite color:" }
        ]}
];

function QuestPage() {
    const { id } = useParams();
    const quest = quests.find(q => q.id === parseInt(id));
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(quest?.timeLimit || 0);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAnswer = (taskId, answer) => {
        setAnswers(prev => {
            const updated = { ...prev, [taskId]: answer };
            setProgress((Object.keys(updated).length / quest.tasks.length) * 100);
            return updated;
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Квест {id}</h1>
            <p>Тут будуть питання, карта і відстеження прогресу.</p>
        </div>
    );
}

export default QuestPage;
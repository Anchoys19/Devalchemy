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
            <h1 className="text-2xl font-bold">{quest?.title}</h1>
            <p>Time left: {timeLeft}s</p>
            <p>Progress: {progress.toFixed(2)}%</p>

            <div className="flex gap-4 mt-4">
                <nav className="w-1/4 bg-gray-100 p-2">
                    <h2 className="text-lg font-semibold">Tasks</h2>
                    {quest.tasks.map(task => (
                        <button key={task.id} className="block text-blue-500 mb-1" onClick={() => document.getElementById(`task-${task.id}`).scrollIntoView()}>Task {task.id}</button>
                    ))}
                </nav>

                <div className="w-3/4">
                    {quest.tasks.map(task => (
                        <div key={task.id} id={`task-${task.id}`} className="mb-4 p-2 border rounded">
                            <h3 className="font-semibold">{task.question}</h3>
                            {task.type === "choice" ? (
                                <div>
                                    {task.options.map(option => (
                                        <button key={option} className="mr-2 p-1 bg-gray-200" onClick={() => handleAnswer(task.id, option)}>{option}</button>
                                    ))}
                                </div>
                            ) : (
                                <textarea className="w-full border p-1" onBlur={(e) => handleAnswer(task.id, e.target.value)} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => navigate(`/rate/${id}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Відправити
            </button>
        </div>
    );
}

export default QuestPage;
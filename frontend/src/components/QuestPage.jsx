import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/QuestPage.css";

function QuestPage() {
    const { id } = useParams();
    const [quest, setQuest] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/quests/${id}/quest_tasks/`)
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                if (data.length > 0) {
                    setTimeLeft(data[0].time_limit || 0);
                }
            });
    }, [id]);

    useEffect(() => {
        if (tasks.length > 0) {
            const fetchOptions = async () => {
                const updatedTasks = await Promise.all(tasks.map(async task => {
                    const response = await fetch(`http://127.0.0.1:5000/quests_tasks/${task.id}/quest_task_test_options/`);
                    const options = await response.json();
                    return { ...task, options };
                }));
                setTasks(updatedTasks);
            };
            fetchOptions();
        }
    }, [tasks]);

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAnswer = (taskId, answer) => {
        setAnswers(prev => {
            const updated = { ...prev, [taskId]: answer };
            setProgress((Object.keys(updated).length / tasks.length) * 100);
            return updated;
        });
    };

    return (
        <div className="quest-container">
            <h1 className="quest-title">Quest {id}</h1>
            <div className="quest-info">
                <p>Time left: {timeLeft}s</p>
                <p>Progress: {progress.toFixed(2)}%</p>
            </div>

            <div className="cont">
                <nav className="quest-nav">
                    <h2 className="task-nav">Tasks</h2>
                    {tasks.map(task => (
                        <button key={task.id} className="task-nav" onClick={() => document.getElementById(`task-${task.id}`).scrollIntoView()}>Task {task.id}</button>
                    ))}
                </nav>

                <div className="tasks-container">
                    {tasks.map(task => (
                        <div key={task.id} id={`task-${task.id}`} className="task-box">
                            <h3 className="font-semibold">{task.name}</h3>
                            <p>{task.description}</p>
                            {task.options && task.options.length > 0 ? (
                                <div>
                                    {task.options.map(option => (
                                        <button key={option.id} className="option-button" onClick={() => handleAnswer(task.id, option.option_text)}>
                                            {option.option_text}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <textarea className="text-answer" onBlur={(e) => handleAnswer(task.id, e.target.value)} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={() => navigate(`/rate/${id}`)}
                className="finish-button"
            >
                Finish
            </button>
        </div>
    );
}

export default QuestPage;

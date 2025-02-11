import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewQuest.css";

const NewQuest = () => {
    const [quest, setQuest] = useState({
        title: "",
        description: "",
        tasks: [],
        timeLimit: "",
        numTasks: "",
      });

    const [isTasksModalOpen, setTasksModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuest({ ...quest, [name]: value });

        if (name === "numTasks") {
            const numValue = Math.floor(Number(value));
            if (!isNaN(numValue) && numValue >= 0) {
                setQuest((prevQuest) => ({
                    ...prevQuest,
                    numTasks: numValue,
                    tasks: Array.from({ length: numValue }, () => ({ type: "text", question: "", options: [] }))
                }));
            }
        } else {
            setQuest((prevQuest) => ({
                ...prevQuest,
                [name]: value
            }));
        }
    };

    const handleTaskChange = (index, key, value) => {
        const updatedTasks = quest.tasks.map((task, i) =>
            i === index ? { ...task, [key]: value } : task
        );
        setQuest({ ...quest, tasks: updatedTasks });
    };

    const addOption = (index) => {
        const updatedTasks = quest.tasks.map((task, i) =>
            i === index ? { ...task, options: [...task.options, ""] } : task
        );
        setQuest({ ...quest, tasks: updatedTasks });
    };

    const handleOptionChange = (taskIndex, optionIndex, value) => {
        const updatedTasks = quest.tasks.map((task, i) => {
            if (i === taskIndex) {
                const updatedOptions = task.options.map((option, j) =>
                    j === optionIndex ? value : option
                );
                return { ...task, options: updatedOptions };
            }
            return task;
        });
        setQuest({ ...quest, tasks: updatedTasks });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Quest created:", quest);
        navigate("/");
    };

    return (
        <div className="quest-modal">
            <div className="quest-content">
                <h2>New Quest</h2>
                <form onSubmit={handleSubmit}>
                <div className="quest-row">
                        <div className="left">
                            <input type="text" name="title" placeholder="Quest Title" value={quest.title} onChange={handleInputChange} required />
                        </div>
                        <div className="right">
                            <textarea name="description" placeholder="Quest Description" value={quest.description} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="quest-row">
                        <div className="left">
                            <input type="number" name="numTasks" placeholder="Number of Tasks" value={quest.numTasks} onChange={handleInputChange} required min="1" step="1" />
                            {quest.numTasks > 0 && (
                                <button type="button" className="edit-tasks-btn" onClick={() => setTasksModalOpen(true)}>
                                    Edit Tasks
                                </button>
                            )}
                        </div>
                        <div className="right">
                            <input type="number" name="timeLimit" placeholder="Time Limit (minutes)" value={quest.timeLimit} onChange={handleInputChange} />
                        </div>
                    </div>

                    <button type="submit" className="create-quest-btn">Create Quest</button>
                </form>
            </div>

            {isTasksModalOpen && (
                <div className="tasks-modal">
                    <div className="tasks-modal-content">
                        <h2>Edit Tasks</h2>
                        {quest.tasks.map((task, index) => (
                            <div key={index} className="task">
                                <select value={task.type} onChange={(e) => handleTaskChange(index, "type", e.target.value)}>
                                    <option value="text">Open-ended</option>
                                    <option value="multiple-choice">Multiple Choice</option>
                                </select>
                                <input type="text" placeholder="Task Question" value={task.question} onChange={(e) => handleTaskChange(index, "question", e.target.value)} />
                                {task.type === "multiple-choice" && (
                                    <div className="options">
                                        {task.options.map((option, optionIndex) => (
                                            <input key={optionIndex} type="text" placeholder={`Option ${optionIndex + 1}`} value={option} onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)} />
                                        ))}
                                        <button type="button" onClick={() => addOption(index)}>Add Option</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => setTasksModalOpen(false)}>Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewQuest;
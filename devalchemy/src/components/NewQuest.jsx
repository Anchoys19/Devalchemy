import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewQuest.css";

const NewQuest = () => {
    const [quest, setQuest] = useState({
        title: "",
        description: "",
        tasks: [],
        timeLimit: "",
      });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
       const { name, value } = e.target;
       setQuest({ ...quest, [name]: value });
    };

    const addTask = () => {
        setQuest({ 
            ...quest, 
            tasks: [...quest.tasks, { type: "text", question: "", options: [], image: "" }] 
        });
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

    const handleImageUpload = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            handleTaskChange(index, "image", reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Quest created:", quest);
        navigate("/");
    };

    return (
      <div className="quest-overlay">
          <div className="quest-container">
              <div className="quest-title-container">
                  <div className="quest-line"></div>
                  <h2 className="quest-title">Create a New Quest</h2>
                  <div className="quest-line"></div>
              </div>
              <form onSubmit={handleSubmit}>
                  <input
                      type="text"
                      name="title"
                      placeholder="Quest Title"
                      value={quest.title}
                      onChange={handleInputChange}
                      required
                  />
                  <textarea
                      name="description"
                      placeholder="Quest Description"
                      value={quest.description}
                      onChange={handleInputChange}
                      required
                  />
                  <input
                      type="number"
                      name="timeLimit"
                      placeholder="Time Limit (minutes)"
                      value={quest.timeLimit}
                      onChange={handleInputChange}
                  />
                  <button type="button" className="quest-btn" onClick={addTask}>Add Task</button>

                  {quest.tasks.map((task, index) => (
                      <div key={index} className="task">
                          <select
                              value={task.type}
                              onChange={(e) => handleTaskChange(index, "type", e.target.value)}
                          >
                              <option value="text">Open-ended</option>
                              <option value="multiple-choice">Multiple Choice</option>
                              <option value="image-search">Image Search</option>
                          </select>
                          <input
                              type="text"
                              placeholder="Task Question"
                              value={task.question}
                              onChange={(e) => handleTaskChange(index, "question", e.target.value)}
                          />
                          {task.type === "multiple-choice" && (
                              <div className="options">
                                  {task.options.map((option, optionIndex) => (
                                      <input
                                          key={optionIndex}
                                          type="text"
                                          placeholder={`Option ${optionIndex + 1}`}
                                          value={option}
                                          onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                      />
                                  ))}
                                  <button type="button" className="quest-btn" onClick={() => addOption(index)}>Add Option</button>
                              </div>
                          )}

                          {task.type === "image-search" && (
                              <div className="image-upload">
                                  <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(index, e.target.files[0])}
                                  />
                                  {task.image && <img src={task.image} alt="Uploaded Task" width="100px" />}
                              </div>
                          )}
                      </div>
                  ))}

                  <button type="submit" className="quest-btn">Save Quest</button>
              </form>
              <button className="go-back-btn" onClick={() => navigate(-1)}>
              <span className="arrow-icon">← Go Back</span>
              </button>
          </div>
      </div>
  );
};

export default NewQuest;
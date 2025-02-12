import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Rating.css";

const sampleRatings = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/50",
    questName: "Name of quest",
    description: "Description",
    author: "Name",
    time: "Time",
    questions: "Num of questions",
    rating: 5,
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/50",
    questName: "Name of quest",
    description: "Description",
    author: "Name",
    time: "Time",
    questions: "Num of questions",
    rating: 5,
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/50",
    questName: "Name of quest",
    description: "Description",
    author: "Name",
    time: "Time",
    questions: "Num of questions",
    rating: 5,
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/50",
    questName: "Name of quest",
    description: "Description",
    author: "Name",
    time: "Time",
    questions: "Num of questions",
    rating: 5,
  },
];

const Rating = () => {
  const navigate = useNavigate();

  return (
    <div className="rating-container">
       <div className="go-back" onClick={() => navigate("/")}>
          <span>⬅ Go Back</span>
        </div>
      
      <h1 className="rating-title">
        <span className="line"></span> Rating <span className="line"></span>
      </h1>
      <div className="rating-list">
        {sampleRatings.map((quest, index) => (
          <div className="rating-item" key={quest.id}>
            <span className="rank">{index + 1}</span>
            <img src={quest.avatar} alt="Avatar" className="avatar" />
            <div className="quest-info">
              <h2 className="quest-name">{quest.questName}</h2>
              <p className="description">{quest.description}</p>
              <p className="author">{quest.author}</p>
            </div>
            <p className="time">{quest.time}</p>
            <p className="questions">{quest.questions}</p>
            <p className="rating">{quest.rating} ★</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;

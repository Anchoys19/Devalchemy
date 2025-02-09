import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/QuestsModal.css";

const QuestsModal = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNewQuest = () => {
        onClose();
        navigate("/new-quest");
    };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="menu-title-container">
          <div className="menu-line"></div>
          <h2 className="modal-title">Quests</h2>
          <div className="menu-line"></div>
        </div>

        <button className="modal-btn" onClick={() => navigate("/my-quests")}>
          My Quests
        </button>
        <button className="modal-btn" onClick={() => navigate("/completed-quests")}>
          Completed Quests
        </button>
        <button className="modal-btn" onClick={handleNewQuest}>
          New Quest
        </button>
        <div className="go-back" onClick={onClose}>
          <span>⬅ Go Back</span>
        </div>
      </div>
    </div>
  );
};

export default QuestsModal;


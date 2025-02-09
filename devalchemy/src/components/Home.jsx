import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import QuestsModal from "./QuestsModal";

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="home-container">
      <div className="menu-box">
      <div className="menu-title-container">
      <div className="menu-line"></div>
        <h1 className="menu-title">Main Menu</h1>
          <div className="menu-line"></div>
        </div>
        <div className="menu-buttons">
          <button className="menu-btn" onClick={() => navigate("/profile")}>
            My Profile
          </button>
          <button className="menu-btn" onClick={() => setIsModalOpen(true)}>
            Quests
          </button>
        </div>
      </div>
      <button className="sign-in-btn" onClick={() => navigate("/signin")}>
        Sign In
      </button>

      {isModalOpen && <QuestsModal onClose={() => setIsModalOpen(false)} navigate={navigate} />}
    </div>
  );
};

export default Home;

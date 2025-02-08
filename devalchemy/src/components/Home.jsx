import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="menu">
      <h1>Main Menu</h1>
        <button onClick={() => navigate("/profile")}>My Profile</button>
        <button onClick={() => navigate("/new-quest")}>New Quest</button>
      </div>
      <button className="sign-in" onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  );
};

export default Home;

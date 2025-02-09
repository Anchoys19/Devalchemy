import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Welcome.css";

    const Welcome = ({ onStart }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      onStart();
      navigate("/");
    };

    return (
        <div className="welcome-container">
          <h1>Welcome to DevAlchemy</h1>
          <button onClick={handleClick}>Start</button>
        </div>
      );
    };
    
    export default Welcome;
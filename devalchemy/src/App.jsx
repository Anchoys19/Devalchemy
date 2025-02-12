import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn"
import Profile from "./components/Profile"
import NewQuest from "./components/NewQuest";
import Welcome from "./components/Welcome";
import AllQuests from "./components/AllQuests";
import QuestPage from "./components/QuestPage";
import RateQuest from "./components/RateQuest";
import './App.css'

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
  
    useEffect(() => {
      const hasVisited = localStorage.getItem("hasVisited");
      if (hasVisited) {
        setShowWelcome(false);
      }
    }, []);
  
    const handleStart = () => {
      localStorage.setItem("hasVisited", "true");
      setShowWelcome(false);
    };
  
    return (
      <Router>
        <Routes>
          {showWelcome ? (
            <Route path="/" element={<Welcome onStart={handleStart} />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quests" element={<AllQuests />} />
          <Route path="/quests/:id" element={<QuestPage />} />
          <Route path="/new-quest" element={<NewQuest />} />
          <Route path="/rate/:id" element={<RateQuest />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
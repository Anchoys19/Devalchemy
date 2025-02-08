import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn"
import Profile from "./components/Profile"
import NewQuest from "./components/NewQuest.jsx";
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/new-quest" element={<NewQuest />} />
            </Routes>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn"
import Profile from "./components/Profile"
import './App.css'

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/profile">Profile</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;

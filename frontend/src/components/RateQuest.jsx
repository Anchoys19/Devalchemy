import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/RateQuest.css"

function RateQuest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        console.log("Rating:", rating, "Feedback:", feedback);
        navigate("/");
    };

    return (
        <div className="rate-quest-container">
            <h1 className="rate-quest-title">Rate Quest</h1>
            <label className="rate-quest-label">
                Rating:
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="rate-quest-select">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </label>

            <label className="rate-quest-label">
                Feedback:
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="rate-quest-textarea"
                    placeholder="Write your thoughts..."
                />
            </label>

            <button
                onClick={handleSubmit}
                className="rate-quest-button"
            >
                Complete
            </button>
        </div>
    );
}

export default RateQuest;
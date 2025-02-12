import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function RateQuest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        console.log("Оцінка:", rating, "Відгук:", feedback);
        navigate("/"); // Повернення на головну сторінку
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Оцініть квест {id}</h1>
            <label className="block mt-4">
                Оцінка:
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-2 border p-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </label>

            <label className="block mt-4">
                Відгук:
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="block w-full border p-2 mt-2"
                    placeholder="Напишіть свою думку..."
                />
            </label>

            <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
                Відправити
            </button>
        </div>
    );
}

export default RateQuest;
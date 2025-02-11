import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [formValues, setFormValues] = useState({
        nickName: "",
        email: "",
        password: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!formValues.nickName || !formValues.email || !formValues.password) {
            setValid(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: formValues.nickName,
                    email: formValues.email,
                    password: formValues.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setValid(true);
                localStorage.setItem("jwt", data.access_token);
                console.log("Successful registration: ", data);
                navigate("/");
            } else {
                setErrorMessage(data.message || "Registration error");
            } 
        } catch (error) {
            setErrorMessage("Server connection error");
            console.error("Request error:", error);
            }
    };

    const handleGoogleLogin = async () => {
        try {
            const auth2 = window.gapi.auth2.getAuthInstance();
            const googleUser = await auth2.signIn();
            const id_token = googleUser.getAuthResponse().id_token;

            const response = await fetch("http://localhost:5000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: id_token }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("jwt", data.access_token);
                navigate("/");
            } else {
                setErrorMessage(data.message || "Google login error");
            }
        } catch (error) {
            setErrorMessage("Google login error");
            console.error("Google login error:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {submitted && valid && (
                    <div className="success-message">
                        <h3>
                            Welcome {formValues.firstName} {formValues.lastName}
                        </h3>
                        <div>Your registration was successful!</div>
                    </div>
                )}

                {!valid && (
                    <>
                        <input
                            className="form-field"
                            type="text"
                            placeholder="NickName"
                            name="nickName"
                            value={formValues.nickName}
                            onChange={handleInputChange}
                        />
                        {submitted && !formValues.nickName && (
                            <span className="error-message">Please enter a first name</span>
                        )}

                        <input
                            className="form-field"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                        {submitted && !formValues.email && (
                            <span className="error-message">Please enter an email address</span>
                        )}

                        <input
                            className="form-field"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleInputChange}
                        />
                        {submitted && !formValues.password && (
                            <span className="error-message">Please enter a password</span>
                        )}

                        <button className="form-field" type="submit">
                            Register
                        </button>
                    </>
                )}
            </form>

            <div className="social-login">
                <button
                    className="social-btn google-btn"
                    onClick={() => handleSocialLogin("Google")}
                >
                    Register with Google
                </button>
                <button
                    className="social-btn facebook-btn"
                    onClick={() => handleSocialLogin("Facebook")}
                >
                    Register with Facebook
                </button>
            </div>
        </div>
    );
};

export default Register;

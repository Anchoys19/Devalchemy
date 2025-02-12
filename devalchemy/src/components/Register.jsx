import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

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
				navigate("/");
			} else {
				setErrorMessage(data.message || "Registration error");
			}
		} catch (error) {
			setErrorMessage("Server connection error");
			console.error("Request error:", error);
		}
	};

	const handleGoogleLogin = async (googleUser) => {
		var profile = googleUser.getBasicProfile();
		var id_token = googleUser.getAuthResponse().id_token;

		try {
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
				setErrorMessage(data.error || "Google login error");
			}
			setSubmitted(true);
		} catch (error) {
			setErrorMessage("Google login failed");
			console.error("Google login error:", error);
		}
	};

	return (
		<div className="modal">
			<meta
				name="google-signin-client_id"
				content="559203323210-iajpj3pu9kjibqmmec31le6m82oo7vp9.apps.googleusercontent.com"
			></meta>
			<div className="modal-content">
				<span className="close-btn" onClick={() => navigate("/")}>
					×
				</span>
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					{submitted && valid && (
						<div className="success-message">
							<h3>Welcome, {formValues.nickName}!</h3>
							<div>Your registration was successful!</div>
						</div>
					)}

					{!valid && (
						<>
							<div className="input-group">
								<label>Nickname</label>
								<input
									type="text"
									name="nickName"
									value={formValues.nickName}
									onChange={handleInputChange}
									placeholder="Enter your nickname"
								/>
								{submitted && !formValues.nickName && (
									<span className="error-message">
										Please enter a nickname
									</span>
								)}
							</div>

							<div className="input-group">
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={formValues.email}
									onChange={handleInputChange}
									placeholder="Enter your email"
								/>
								{submitted && !formValues.email && (
									<span className="error-message">
										Please enter an email
									</span>
								)}
							</div>

							<div className="input-group">
								<label>Password</label>
								<input
									type="password"
									name="password"
									value={formValues.password}
									onChange={handleInputChange}
									placeholder="Enter your password"
								/>
								{submitted && !formValues.password && (
									<span className="error-message">
										Please enter a password
									</span>
								)}
							</div>

							<button className="neon-button" type="submit">
								Register
							</button>
						</>
					)}
				</form>

				<div className="social-login">
					<button
						className="social-btn google-btn g-signin2"
						onClick={handleGoogleLogin}
					>
						Register with Google
					</button>
				</div>

				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}

				<div className="switch-auth">
					Already have an account?{" "}
					<span onClick={() => navigate("/signin")}>Sign In</span>
				</div>
			</div>
			<script
				src="https://apis.google.com/js/platform.js"
				async
				defer
			></script>
		</div>
	);
};

export default Register;

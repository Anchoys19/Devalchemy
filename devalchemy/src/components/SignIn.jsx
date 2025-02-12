import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../css/SignIn.css";

const SignIn = () => {
    const [formValues, setFormValues ] = useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid ] = useState(false);
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
      setErrorMessage("");

      if (!formValues.email || !formValues.password) {
          return;
      }

      try {
          const response = await fetch("http://localhost:5000/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formValues),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || "Login failed");
          }

          localStorage.setItem("token", data.token);
          setValid(true);
          setTimeout(() => navigate("/"), 1000);
      } catch (error) {
          setErrorMessage(error.message);
      }
  };

    return(
        <div className="modal">
          <div className="modal-content">
          <span className="close-btn" onClick={() => navigate("/")}>×</span>
            <h2>Sign In</h2>

            <form onSubmit={handleSubmit}>
              {!valid ? (
               <>
                <div className="input-group">
                 <label htmlFor="email">Email</label>
                 <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {submitted && !formValues.email && (
                  <span className="error-message">Please enter an email</span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {submitted && !formValues.password && (
                  <span className="error-message">Please enter a password</span>
                )}
              </div>

              <a href="#" className="forgot-password">Forgot password?</a>

              <button type="submit" className="neon-button">Sign In</button>

              <p className="switch-auth">
                Don't have an account? <span onClick={() => navigate("/register")}>Sign Up</span>
              </p>
            </>
          ) : (
            <div className="success-message">
              <h3>Welcome!</h3>
              <p>Sign In successful.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
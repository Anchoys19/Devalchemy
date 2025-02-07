import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
    });
  
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
  
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (formValues.firstName && formValues.lastName && formValues.email) {
        setValid(true);
        navigate("/");
      }
      setSubmitted(true);
    };
  
    const handleSocialLogin = (platform) => {
      console.log(`Registration via ${platform}`);
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
                placeholder="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              {submitted && !formValues.firstName && (
                <span className="error-message">Please enter a first name</span>
              )}
  
              <input
                className="form-field"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              {submitted && !formValues.lastName && (
                <span className="error-message">Please enter a last name</span>
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
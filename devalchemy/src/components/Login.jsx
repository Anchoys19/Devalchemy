import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formValues, setFormValues ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid ] = useState(false);

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
        if (formValues.firstName && formValues.lastName && formValues.email && formValues.password) {
            setValid(true);
            navigate("/");
        }
        setSubmitted(true);
    };

    return(
        <div className="form-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                {submitted && valid && (
                    <div className="success-message">
                        <h3>
                            Welcome {formValues.firstName} {formValues.lastName}
                        </h3>
                    </div>
                )}

                {!valid && (
                    <>
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
                            Login
                        </button>
                    </>
                )}
            </form>

        </div>
    );
};

export default Login;
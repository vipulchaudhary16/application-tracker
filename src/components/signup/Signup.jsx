import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../context/user.context";
import "./signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const { signUp } = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword != password) {
            alert("Password does not match")
            return
        }
        const response = await signUp({ name, email, password })
        if (response) {
            alert("Account Created")
            navigate("/login")
        } else {
            alert("Failed")
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;

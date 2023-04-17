import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from "../../context/user.context";
import { AlertContext } from "../../context/alert.context";
//css in App.css

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const { signUp } = useContext(UserContext)
    const {setAlertMessage} = useContext(AlertContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword !== password) {
            setAlertMessage("Password does not match")
            return
        }
        const response = await signUp({ name, email, password })
        if (response) {
            setAlertMessage("Account Created")
            navigate("/login")
        } else {
            setAlertMessage("Failed")
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h1>SIGN UP</h1>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary">SIGN UP</button>
                <Link to="/login" className="link">Already have an account?</Link>
            </form>
        </div>
    );
};

export default SignUp;

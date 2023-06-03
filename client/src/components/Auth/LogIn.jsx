import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from "../../context/user.context";
import { UIContext } from "../../context/ui.controler.context";

//css in App.css

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { logIn, loadUser } = useContext(UserContext)
  const {setIsLoading} = useContext(UIContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const response = await logIn({ email: email, password: password })
    if (response) {
      navigate("/")
      localStorage.setItem('token', response.data.token)
      loadUser()
    }
    setIsLoading(false)
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <button type="submit" className="btn btn-primary ">Log In</button>
        <Link to="/signup" className="link">Don't have account?, sign up now</Link>
      </form>
    </div>
  );
};

export default LogIn;

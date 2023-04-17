import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import './Navbar.css';
import { UserContext } from '../../context/user.context';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { currentUser, loadUser } = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem('token')
        loadUser()
        navigate("/login")
    }
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <span>Job Tracker</span>

                </Link>
            </div>
            <ul className="navbar-nav">
                <img src={logo} alt="" />
            </ul>
            <div className="navbar-right">
                {
                    currentUser ? (<button className="btn logout-btn" onClick={() => handleLogOut()} >Log out</button>) : (null)
                }
            </div>
        </nav>
    );
}

export default Navbar;

import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">
                    <span>Job Tracker</span>
                </a>
            </div>
            <ul className="navbar-nav">
                <img src={logo} alt="" />
            </ul>
            <div className="navbar-right">
                <button className="logout-btn" onClick={() => handleLogOut()} >Log out</button>
            </div>
        </nav>
    );
}

export default Navbar;

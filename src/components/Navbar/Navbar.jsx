import React from 'react';
import logo from '../../assets/logo.png';
import './Navbar.css';

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
                {
                    localStorage.getItem('token') ? (<button className="btn logout-btn" onClick={() => handleLogOut()} >Log out</button>) : (null)
                }
            </div>
        </nav>
    );
}

export default Navbar;

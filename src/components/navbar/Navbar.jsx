import React from 'react';
import './Navbar.css';

const Navbar = () => {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <nav className="navbar">
            <div className="navbar-logo">Logo</div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">Contact</a>
                </li>
            </ul>
            <div className="navbar-right">
                <button className="logout-btn" onClick={() => handleLogOut()} >Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;

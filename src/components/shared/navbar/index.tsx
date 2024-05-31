// Navbar.tsx
import React from 'react';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    iiHuman
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item"><a href="#home">Help</a></li>
                    <li className="navbar-item"><a href="#about">Settings</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

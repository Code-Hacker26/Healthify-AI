import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/authNavbar.css';

const AuthNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="auth-navbar">
            <div className="logo">
                <Link to="/">
                    <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Logo" />
                </Link>
            </div>
            <button className="toggle-button" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {/* Add other navigation links here */}
            </div>
        </nav>
    );
}

export default AuthNavbar;

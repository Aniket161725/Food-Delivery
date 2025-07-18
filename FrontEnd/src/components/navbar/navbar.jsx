import React, { useState } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets.js';


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState("home");

    return (
        <div className="navbar">
            <img
                src={assets.logo}
                alt="Food delivery service logo"
                className="logo"
                style={{}} 
            />

            <ul className="navbar-menu">
                <li className={menuOpen === "home" ? "active" : ""} onClick={() => setMenuOpen("home")}>Home</li>
                <li className={menuOpen === "menu" ? "active" : ""} onClick={() => setMenuOpen("menu")}>Menu</li>
                <li className={menuOpen === "mobile" ? "active" : ""} onClick={() => setMenuOpen("mobile")}>Mobile App</li>
                <li className={menuOpen === "contact" ? "active" : ""} onClick={() => setMenuOpen("contact")}>Contact Us</li>
                <li className={menuOpen === "cart" ? "active" : ""} onClick={() => setMenuOpen("cart")}>Cart</li>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" className="search-icon" />
                <img src={assets.basket_icon} alt="Basket" className="basket-icon" />
                <button className="navbar-buttons">sign in</button>
            </div>

        </div>
    );
};

export default Navbar;

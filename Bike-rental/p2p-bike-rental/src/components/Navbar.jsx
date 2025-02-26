import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);



  return (
    <header>
      <div className="container">
        <h1>P2P Bike Rental</h1>
        {/* Navigation Menu */}
        <nav ref={menuRef} className={isMenuOpen ? "open" : ""} aria-expanded={isMenuOpen}>
          <Link to="/">Home</Link>
          <Link to="/bike-search">Bike Search</Link>
          <Link to="/become-owner">Become a Bike Owner</Link>
          <Link to="/support">Support</Link>
          <Link to="/login" className="cta-btn">Login</Link>
        </nav>

        {/* Toggle Button */}
        <button
          ref={buttonRef}
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;


import React, { useState, useEffect, useRef } from "react";
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
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
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
          <a href="#">Home</a>
          <a href="#">Bike Search</a>
          <a href="#">Become a Bike Owner</a>
          <a href="#">Support</a>
          <a href="#" className="cta-btn">Login</a>
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

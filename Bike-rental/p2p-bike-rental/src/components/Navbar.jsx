import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for menu
  const buttonRef = useRef(null); // Reference for the toggle button

  const toggleMenu = (event) => {
    event.stopPropagation(); // Prevent event from bubbling to the document
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) // Ensure toggle button click doesn't close the menu
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header>
      <div className="container">
        <h1>P2P Bike Rental</h1>
        <nav ref={menuRef} className={isMenuOpen ? "open" : ""}>
          <a href="#">Home</a>
          <a href="#">Bike Search</a>
          <a href="#">Become a Bike Owner</a>
          <a href="#">Support</a>
          <a href="#" className="cta-btn">Login</a>
        </nav>
        {/* Toggle Button */}
        <button ref={buttonRef} className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

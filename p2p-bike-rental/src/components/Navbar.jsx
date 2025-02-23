import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS for Navbar

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <h1>P2P Bike Rental</h1>
        <nav className={isMenuOpen ? 'open' : ''}>
          <a href="#">Home</a>
          <a href="#">Bike Search</a>
          <a href="#">Become a Bike Owner</a>
          <a href="#">Support</a>
          <a href="#" className="cta-btn">Login</a>
        </nav>
        {/* Toggle Button */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

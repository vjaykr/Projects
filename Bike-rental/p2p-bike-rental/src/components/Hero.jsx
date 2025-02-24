import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Discover & Rent Bikes with Ease</h1>
        <p>Find the perfect ride for your adventure, anytime, anywhere.</p>
        <div className="hero-buttons">
          <a href="#" className="btn-primary">Get Started</a>
          <a href="#" className="btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

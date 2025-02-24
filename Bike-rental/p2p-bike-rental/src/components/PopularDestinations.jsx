import React from 'react';
import './PopularDestinations.css';

const PopularDestinations = () => {
  return (
    <section className="popular-destinations">
      <h2 className="section-title">Popular Rental Destinations</h2>
      <p className="section-subtitle">Discover the best spots for bike riding</p>
      <div className="destination-grid">
        <div className="destination-box">
          <img src="https://via.placeholder.com/300x200" alt="Beach" />
          <h4>Beach Side</h4>
          <p>Enjoy scenic coastal rides with easy-access bike rentals.</p>
        </div>
        <div className="destination-box">
          <img src="https://via.placeholder.com/300x200" alt="Park" />
          <h4>City Parks</h4>
          <p>Relax and explore nature-friendly biking trails.</p>
        </div>
        <div className="destination-box">
          <img src="https://via.placeholder.com/300x200" alt="Mountains" />
          <h4>Mountain Trails</h4>
          <p>Experience adventurous mountain biking with stunning views.</p>
        </div>
        <div className="destination-box">
          <img src="https://via.placeholder.com/300x200" alt="Countryside" />
          <h4>Countryside Roads</h4>
          <p>Take a peaceful ride through lush landscapes and open fields.</p>
        </div>
        <div className="destination-box">
          <img src="https://via.placeholder.com/300x200" alt="Urban Routes" />
          <h4>Urban Routes</h4>
          <p>Commute through bustling city roads with ease.</p>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;

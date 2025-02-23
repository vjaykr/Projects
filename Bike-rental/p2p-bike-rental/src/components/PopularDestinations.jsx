import React from 'react';
import './PopularDestinations.css';

const PopularDestinations = () => {
  return (
    <section className="popular-destinations">
      <div className="container">
        <h2>Popular Rental Destinations</h2>
        <div className="destination">
          <img src="https://via.placeholder.com/600x400" alt="Beach" />
          <h4>Beach Side</h4>
        </div>
        <div className="destination">
          <img src="https://via.placeholder.com/600x400" alt="Park" />
          <h4>City Parks</h4>
        </div>
        <div className="destination">
          <img src="https://via.placeholder.com/600x400" alt="Mountains" />
          <h4>Mountain Trails</h4>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;

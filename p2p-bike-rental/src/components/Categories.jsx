import React from 'react';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories">
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Mountain Bike" />
        <h3>Mountain Bikes</h3>
        <p>Explore the rugged terrain with our collection of mountain bikes.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="City Bikes" />
        <h3>City Bikes</h3>
        <p>Perfect for smooth rides around the city with comfort and style.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Electric Bikes" />
        <h3>Electric Bikes</h3>
        <p>Go green and ride with ease using our electric bikes.</p>
      </div>
    </section>
  );
};

export default Categories;

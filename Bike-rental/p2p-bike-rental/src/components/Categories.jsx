import React from 'react';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories">
      <div className="full-width-container">
        <h2 className="section-title">Explore Our Bike Categories</h2>
        <p className="section-subtitle">Find the perfect ride for your journey</p>
        <div className="category-grid">
          <div className="category-box">
            <img src="https://via.placeholder.com/300x200" alt="Mountain Bike" />
            <h3>Mountain Bike Rentals</h3>
            <p>Rent high-quality mountain bikes and explore rugged terrains with ease.</p>
          </div>
          <div className="category-box">
            <img src="https://via.placeholder.com/300x200" alt="City Bike" />
            <h3>City Bike Rentals</h3>
            <p>Navigate urban streets with stylish and comfortable bike rentals.</p>
          </div>
          <div className="category-box">
            <img src="https://via.placeholder.com/300x200" alt="Electric Bike" />
            <h3>Electric Bike Rentals</h3>
            <p>Enjoy effortless rides with eco-friendly electric bikes available for rent.</p>
          </div>
          <div className="category-box">
            <img src="https://via.placeholder.com/300x200" alt="Road Bike" />
            <h3>Road Bike Rentals</h3>
            <p>Speed through highways with top-notch road bike rentals.</p>
          </div>
          {/* <div className="category-box">
            <img src="https://via.placeholder.com/300x200" alt="Kids Bike" />
            <h3>Kids Bike Rentals</h3>
            <p>Safe and fun bike rentals for kids, ensuring a joyful riding experience.</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Categories;

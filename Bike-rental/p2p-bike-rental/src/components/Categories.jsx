import React from 'react';
import './Categories.css';

const Categories = () => {
  return (
    <section className="categories">
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Mountain Bike" />
        <h3>Mountain Bike Rentals</h3>
        <p>Rent high-quality mountain bikes from local owners and conquer the toughest trails with ease.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="City Bike" />
        <h3>City Bike Rentals</h3>
        <p>Navigate urban landscapes with ease using stylish and comfortable city bikes available for rent.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Electric Bike" />
        <h3>Electric Bike Rentals</h3>
        <p>Enjoy an effortless ride with locally rented e-bikes, perfect for long distances or commuting.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Road Bike" />
        <h3>Road Bike Rentals</h3>
        <p>Rent high-performance road bikes and experience smooth rides on highways and city roads.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Tandem Bike" />
        <h3>Tandem Bike Rentals</h3>
        <p>Share the ride with a friend or loved one by renting a tandem bike for a fun experience.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Kids Bike" />
        <h3>Kids Bike Rentals</h3>
        <p>Safe and fun bikes for kids, available from local bike owners for family-friendly rides.</p>
      </div>
      <div className="category">
        <img src="https://via.placeholder.com/300x200" alt="Scooter" />
        <h3>Scooter Rentals</h3>
        <p>Need something compact? Rent electric and manual scooters for short, convenient trips.</p>
      </div>
    </section>
  );
};

export default Categories;

// bikesearch.jsx
import React, { useState } from 'react';
import './bikesearch.css';

const BikeSearch = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    dateRange: '',
    bikeType: '',
    priceRange: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Search params:', searchParams);
  };

  return (
    <div className="bike-search-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Find Your Perfect Ride</h1>
          <p>Explore bikes from local owners in your area</p>
        </div>
      </section>

      {/* Search Form */}
      <section className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-fields">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter city or area"
                value={searchParams.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateRange">Date Range</label>
              <input
                type="text"
                id="dateRange"
                name="dateRange"
                placeholder="Select dates"
                value={searchParams.dateRange}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bikeType">Bike Type</label>
              <select
                id="bikeType"
                name="bikeType"
                value={searchParams.bikeType}
                onChange={handleInputChange}
              >
                <option value="">All Types</option>
                <option value="road">Road Bike</option>
                <option value="mountain">Mountain Bike</option>
                <option value="electric">Electric Bike</option>
                <option value="city">City Bike</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priceRange">Price Range</label>
              <select
                id="priceRange"
                name="priceRange"
                value={searchParams.priceRange}
                onChange={handleInputChange}
              >
                <option value="">Any Price</option>
                <option value="0-20">$0 - $20</option>
                <option value="20-40">$20 - $40</option>
                <option value="40-60">$40 - $60</option>
                <option value="60+">$60+</option>
              </select>
            </div>
          </div>
          <button type="submit" className="search-button">Search Bikes</button>
        </form>
      </section>

      {/* Featured Bikes Preview */}
      <section className="featured-bikes">
        <h2>Featured Bikes</h2>
        <div className="bike-grid">
          <div className="bike-card">
            <img src="https://via.placeholder.com/300x200" alt="Mountain Bike" />
            <div className="bike-info">
              <h3>Mountain Explorer</h3>
              <p>$25/day • 4.8 ★</p>
            </div>
          </div>
          <div className="bike-card">
            <img src="https://via.placeholder.com/300x200" alt="City Bike" />
            <div className="bike-info">
              <h3>City Cruiser</h3>
              <p>$18/day • 4.9 ★</p>
            </div>
          </div>
          <div className="bike-card">
            <img src="https://via.placeholder.com/300x200" alt="Electric Bike" />
            <div className="bike-info">
              <h3>E-Bike Pro</h3>
              <p>$35/day • 4.7 ★</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Rent With Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3>Local Connections</h3>
            <p>Rent directly from bike owners in your community</p>
          </div>
          <div className="benefit-item">
            <h3>Affordable Rates</h3>
            <p>Competitive pricing for every budget</p>
          </div>
          <div className="benefit-item">
            <h3>Variety of Choice</h3>
            <p>From road bikes to e-bikes, find your style</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BikeSearch;
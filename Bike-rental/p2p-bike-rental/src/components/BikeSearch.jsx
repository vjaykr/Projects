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
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with parameters:', searchParams);
  };

  return (
    <div className="bikesearch-container">
      {/* Hero Section */}
      <section className="bikesearch-hero-section">
        <div className="bikesearch-hero-overlay">
          <h1>Find Your Perfect Ride</h1>
          <p>Discover bikes from trusted local owners</p>
        </div>
      </section>

      {/* Search Form */}
      <section className="bikesearch-search-section">
        <form className="bikesearch-search-form" onSubmit={handleSearch}>
          <div className="bikesearch-form-group">
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

          <div className="bikesearch-form-group">
            <label htmlFor="dateRange">Date Range</label>
            <input
              type="date"
              id="dateRange"
              name="dateRange"
              value={searchParams.dateRange}
              onChange={handleInputChange}
            />
          </div>

          <div className="bikesearch-form-group">
            <label htmlFor="bikeType">Bike Type</label>
            <select id="bikeType" name="bikeType" value={searchParams.bikeType} onChange={handleInputChange}>
              <option value="">All Types</option>
              <option value="road">Road Bike</option>
              <option value="mountain">Mountain Bike</option>
              <option value="electric">Electric Bike</option>
              <option value="city">City Bike</option>
            </select>
          </div>

          <div className="bikesearch-form-group">
            <label htmlFor="priceRange">Price Range</label>
            <select id="priceRange" name="priceRange" value={searchParams.priceRange} onChange={handleInputChange}>
              <option value="">Any Price</option>
              <option value="0-20">$0 - $20</option>
              <option value="20-40">$20 - $40</option>
              <option value="40-60">$40 - $60</option>
              <option value="60+">$60+</option>
            </select>
          </div>

          <button type="submit" className="bikesearch-search-button">Search Bikes</button>
        </form>
      </section>

      {/* Featured Bikes Section */}
      <section className="bikesearch-featured-bikes">
        <h2>Featured Bikes</h2>
        <div className="bikesearch-bike-grid">
          {["Mountain Explorer", "City Cruiser", "E-Bike Pro"].map((bike, index) => (
            <div className="bikesearch-bike-card" key={index}>
              <img src={`https://via.placeholder.com/300x200?text=${bike}`} alt={bike} />
              <div className="bikesearch-bike-info">
                <h3>{bike}</h3>
                <p>$ {index * 10 + 20}/day • {4.7 + index * 0.1} ★</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bikesearch-benefits-section">
        <h2>Why Rent With Us?</h2>
        <div className="bikesearch-benefits-grid">
          {[
            { title: "Local Connections", description: "Rent directly from bike owners in your community." },
            { title: "Affordable Rates", description: "Competitive pricing for every budget." },
            { title: "Variety of Choices", description: "From road bikes to e-bikes, find your style." },
          ].map((benefit, index) => (
            <div className="bikesearch-benefit-item" key={index}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BikeSearch;

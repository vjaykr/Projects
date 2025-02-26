// becomeowner.jsx
import React, { useState } from 'react';
import './BecomeOwner.css';

const BecomeOwner = () => {
  const [ownerData, setOwnerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bikeName: '',
    bikeType: '',
    bikeDescription: '',
    pricePerDay: '',
    location: '',
    availability: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submission logic here
    console.log('Owner data:', ownerData);
  };

  return (
    <div className="become-owner-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Become a Bike Owner</h1>
          <p>Earn money by sharing your bike with others</p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="owner-form-container">
        <div className="form-wrapper">
          <h2>List Your Bike</h2>
          <form className="owner-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={ownerData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={ownerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={ownerData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bikeName">Bike Name</label>
                <input
                  type="text"
                  id="bikeName"
                  name="bikeName"
                  placeholder="My Awesome Bike"
                  value={ownerData.bikeName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="bikeType">Bike Type</label>
                <select
                  id="bikeType"
                  name="bikeType"
                  value={ownerData.bikeType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="road">Road Bike</option>
                  <option value="mountain">Mountain Bike</option>
                  <option value="electric">Electric Bike</option>
                  <option value="city">City Bike</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pricePerDay">Price per Day ($)</label>
                <input
                  type="number"
                  id="pricePerDay"
                  name="pricePerDay"
                  placeholder="25"
                  value={ownerData.pricePerDay}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={ownerData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  placeholder="e.g., Mon-Fri, 9AM-5PM"
                  value={ownerData.availability}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="bikeDescription">Bike Description</label>
                <textarea
                  id="bikeDescription"
                  name="bikeDescription"
                  placeholder="Describe your bike features, condition, etc."
                  value={ownerData.bikeDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Become an Owner
            </button>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Share Your Bike?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3>Earn Extra Income</h3>
            <p>Make money when your bike is idle</p>
          </div>
          <div className="benefit-item">
            <h3>Simple Process</h3>
            <p>Easy listing and management</p>
          </div>
          <div className="benefit-item">
            <h3>Community Impact</h3>
            <p>Help others enjoy cycling</p>
          </div>
          <div className="benefit-item">
            <h3>Insurance Coverage</h3>
            <p>Protection for your peace of mind</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2>What Owners Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"I've earned over $500 sharing my bike when I'm not using it!"</p>
            <span>- Sarah M.</span>
          </div>
          <div className="testimonial-card">
            <p>"The process was so easy, and I love helping others ride."</p>
            <span>- Mike T.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeOwner;
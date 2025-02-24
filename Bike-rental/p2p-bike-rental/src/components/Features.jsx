import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="section-subtitle">
          Enjoy a seamless bike rental experience with top-notch services.
        </p>
        <div className="feature-grid">
          <div className="feature-box">
            <i className="fas fa-bicycle"></i>
            <h3>Variety of Bikes</h3>
            <p>Choose from mountain bikes, road bikes, e-bikes, and more.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-clock"></i>
            <h3>Flexible Rentals</h3>
            <p>Rent bikes by the hour, day, or week with hassle-free options.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-lock"></i>
            <h3>Secure Payment</h3>
            <p>Pay safely with trusted payment gateways like Stripe & Razorpay.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Real-Time Tracking</h3>
            <p>Track your rental bike with real-time GPS for safety and convenience.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-star"></i>
            <h3>Ratings & Reviews</h3>
            <p>Read reviews and ratings to select the best bike for your journey.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Get round-the-clock support for any issues or queries.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="feature-box">
          <h3>Variety of Bikes</h3>
          <p>Choose from a wide range of bikes including mountain bikes, e-bikes, and more.</p>
        </div>
        <div className="feature-box">
          <h3>Flexible Rentals</h3>
          <p>Rent bikes by the hour, day, or week with flexible options for your convenience.</p>
        </div>
        <div className="feature-box">
          <h3>Secure Payment</h3>
          <p>Pay securely through integrated payment gateways like Stripe and Razorpay.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;

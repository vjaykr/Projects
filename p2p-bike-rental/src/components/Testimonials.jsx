import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2>User Testimonials</h2>
        <div className="testimonial">
          <p>"The platform made it easy to rent bikes for a weekend getaway. Highly recommend!"</p>
          <p>- Jane D.</p>
        </div>
        <div className="testimonial">
          <p>"A seamless experience for both renters and bike owners. Very happy!"</p>
          <p>- Mark T.</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

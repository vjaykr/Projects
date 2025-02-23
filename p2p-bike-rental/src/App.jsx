import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import PopularDestinations from './components/PopularDestinations';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      
      <Hero />
      <Features />
      <Categories />
      <PopularDestinations />
      <Partners />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default App;

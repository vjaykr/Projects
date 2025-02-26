import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import PopularDestinations from "./components/PopularDestinations";
import Partners from "./components/Partners";
import Testimonials from "./components/Testimonials";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import BikeSearch from "./components/BikeSearch";
import BecomeOwner from "./components/BecomeOwner";
import Login from "./components/Login";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home Page with all sections */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Categories />
                <PopularDestinations />
                <Partners />
                <Testimonials />
                <CtaSection />
                <Footer />
              </>
            }
          />

          {/* Bike Search Page */}
          <Route path="/bike-search" element={<BikeSearch />} />
           {/* Become Owner Page */}
           <Route path="/become-owner" element={<BecomeOwner />} />

          {/* login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

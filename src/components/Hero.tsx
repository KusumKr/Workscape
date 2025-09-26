import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">Find Your Next Remote Work Paradise</h1>
        <p className="hero-subtitle">
          Discover the perfect work environment that matches your lifestyle & productivity needs.
        </p>
        <Link to="/explore" className="cta-button">
          Explore Destinations
        </Link>
      </div>
    </div>
  );
};

export default Hero;
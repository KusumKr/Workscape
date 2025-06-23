import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">
          Find Your Next Remote Work Paradise
        </h1>
        <p className="hero-subtitle">
          Discover the perfect work environment that matches your lifestyle and productivity needs
        </p>
        <button className="cta-button">
          Explore Locations
        </button>
      </div>
    </div>
  );
};

export default Hero; 
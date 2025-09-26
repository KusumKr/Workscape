import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/workscape-logo.jpg" alt="WORKSCAPE Logo" className="logo" />
          <span className="brand-name">Workscape</span>
        </div>
        <button className={`navbar-hamburger${menuOpen ? ' open' : ''}`} onClick={handleMenuToggle} aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
          <li className="nav-item"><a href="/" className="nav-link" onClick={handleLinkClick}>Home</a></li>
          <li className="nav-item"><a href="/explore" className="nav-link" onClick={handleLinkClick}>Explore</a></li>
          <li className="nav-item"><a href="/about" className="nav-link" onClick={handleLinkClick}>About Us</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link" onClick={handleLinkClick}>Contact</a></li>
          <li className="nav-item"><a href="/community" className="nav-link" onClick={handleLinkClick}>Community</a></li>
        </ul>
        <div className="nav-actions nav-actions-desktop">
          <a href="/login" className="nav-action-link">Login</a>
          <a href="/signup" className="nav-action-link signup">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
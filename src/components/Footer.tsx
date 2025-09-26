import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-about">
          <div className="footer-brand">
            <img src="/workscape-logo.jpg" alt="Workscape India logo" className="footer-logo" />
            <span className="footer-brand-name">Workscape</span>
          </div>
          <p className="footer-about">
            Discover India’s top destinations for remote work. Curated spots with great internet,
            vibrant communities and inspiring surroundings.
          </p>
        </div>
        <div className="footer-links-single-column">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/explore">Explore</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/community">Community</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Subscribe to our newsletter</h4>
          <p>Monthly digest of what's new and exciting from us.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          © {new Date().getFullYear()} Workscape, Inc. All rights reserved.
        </div>
        <div className="footer-socials">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.052.072 5.77.13 4.8.31 4.01.54c-.8.23-1.48.54-2.16 1.22C1.17 2.46.86 3.14.63 3.94.4 4.73.22 5.7.16 6.98.1 8.26.087 8.664.087 12c0 3.336.013 3.74.072 5.02.058 1.28.24 2.25.47 3.04.23.8.54 1.48 1.22 2.16.68.68 1.36.99 2.16 1.22.79.23 1.76.41 3.04.47C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.28-.058 2.25-.24 3.04-.47.8-.23 1.48-.54 2.16-1.22.68-.68.99-1.36 1.22-2.16.23-.79.41-1.76.47-3.04.059-1.28.072-1.684.072-5.02 0-3.336-.013-3.74-.072-5.02-.058-1.28-.24-2.25-.47-3.04-.23-.8-.54-1.48-1.22-2.16-.68-.68-1.36-.99-2.16-1.22-.79-.23-1.76-.41-3.04-.47C15.668.013 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
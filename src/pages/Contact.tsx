import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Get In Touch</h1>
          <p>Have questions or feedback? We'd love to hear from you!</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Our Office</h3>
            <p>123 Digital Nomad Way<br />Bali, Indonesia 80361</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">✉️</div>
            <h3>Email Us</h3>
            <p><a href="mailto:hello@workscape.com">hello@workscape.com</a></p>
            <p><a href="mailto:support@workscape.com">support@workscape.com</a></p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon - Fri, 9am - 5pm GMT+8</p>
          </div>
          
          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://twitter.com/workscape" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="https://instagram.com/workscape" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span>📸</span>
              </a>
              <a href="https://linkedin.com/company/workscape" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="https://facebook.com/workscape" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span>👍</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {submitStatus && (
            <div className={`alert ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="map-container">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.5212601125!2d115.16773831533885!3d-8.6467922908005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd237f23d9fb1a5%3A0x6ebd43d7fdc4d1c6!2sCanggu%2C%20Kuta%20Utara%2C%20Badung%20Regency%2C%20Bali%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Digital nomad with 10+ years of experience working remotely from 30+ countries.',
      image: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Head of Community',
      bio: 'Passionate about connecting remote workers and building meaningful communities.',
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 3,
      name: 'Miguel Rodriguez',
      role: 'Product Lead',
      bio: 'Ensuring our platform meets the needs of modern digital nomads.',
      image: 'https://i.pravatar.cc/150?img=6'
    },
  ];

  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Empowering digital nomads to work from anywhere, live everywhere.</p>
        </div>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <div className="mission-text">
            <p>We believe that work shouldn't tie you to a single location. Our platform helps remote workers, freelancers, and digital nomads find the perfect workation destinations with reliable workspaces, strong internet, and vibrant communities.</p>
            <p>Founded in 2023, WorkScape has grown into a global community of thousands of location-independent professionals who value flexibility, adventure, and work-life balance.</p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Destinations</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Community Members</p>
            </div>
            <div className="stat-item">
              <h3>30+</h3>
              <p>Countries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="our-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member">
              <div className="member-image" style={{ backgroundImage: `url(${member.image})` }}></div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="our-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌍</div>
            <h3>Global Community</h3>
            <p>Connecting digital nomads across the world to share knowledge and experiences.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💡</div>
            <h3>Innovation</h3>
            <p>Constantly improving our platform to better serve the needs of remote workers.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Trust</h3>
            <p>Providing reliable information and fostering trust within our community.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

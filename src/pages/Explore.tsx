import React from 'react';
import '../styles/Explore.css';
import { Link } from 'react-router-dom';

const Explore = () => {
  const categories = [
    {
      id: 1,
      title: 'Co-working Spaces',
      description: 'Find the perfect workspace for your needs',
      icon: '💼',
      link: '/coworking-spaces'
    },
    {
      id: 2,
      title: 'Digital Nomad Hubs',
      description: 'Discover the best cities for digital nomads',
      icon: '🌍',
      link: '/digital-nomad-hubs'
    },
    {
      id: 3,
      title: 'Local Experiences',
      description: 'Immerse yourself in local culture',
      icon: '🎭',
      link: '/local-experiences'
    },
    {
      id: 4,
      title: 'Travel Tips',
      description: 'Essential tips for working while traveling',
      icon: '💡',
      link: '/travel-tips'
    },
  ];

  return (
    <div className="explore-container">
      <div className="explore-hero">
        <h1>Explore Workation Destinations</h1>
        <p>Find your perfect work-life balance in amazing locations worldwide</p>
      </div>
      
      <div className="categories-grid">
        {categories.map(category => (
          <Link to={category.link} key={category.id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>

      <div className="featured-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          {/* This would be populated with actual destination data */}
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: 'url(https://picsum.photos/400/300?random=4)'}}></div>
            <h3>Bali, Indonesia</h3>
            <p>Digital nomad paradise with amazing workspaces</p>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: 'url(https://picsum.photos/400/300?random=5)'}}></div>
            <h3>Lisbon, Portugal</h3>
            <p>European hotspot for remote workers</p>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{backgroundImage: 'url(https://picsum.photos/400/300?random=6)'}}></div>
            <h3>Bangkok, Thailand</h3>
            <p>Vibrant city with affordable living</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

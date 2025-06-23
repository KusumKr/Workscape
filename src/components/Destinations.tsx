import React, { useState, useEffect } from 'react';
import './Destinations.css';
import DestinationCard from './DestinationCard';
import FilterBar from './FilterBar';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Destination {
  id: string;
  name: string;
  image: string;
  internetSpeed: string;
  weather: string;
  cost: string;
  description: string;
  hasCoworking?: boolean;
  hasLeisure?: boolean;
}

interface FilterOptions {
  internetSpeed: string;
  budget: string;
  weather: string;
  hasCoworking: boolean;
  hasLeisure: boolean;
}

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'destination'));
      const fetched: Destination[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination));
      setDestinations(fetched);
      setFilteredDestinations(fetched);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  const handleFilterChange = (filters: FilterOptions) => {
    const filtered = destinations.filter(destination => {
      // Internet Speed filter
      if (filters.internetSpeed !== 'all') {
        const speed = parseInt(destination.internetSpeed.match(/\d+/)?.[0] || '0');
        if (filters.internetSpeed === 'very-fast' && speed < 200) return false;
        if (filters.internetSpeed === 'fast' && (speed < 100 || speed >= 200)) return false;
        if (filters.internetSpeed === 'moderate' && (speed < 50 || speed >= 100)) return false;
        if (filters.internetSpeed === 'slow' && speed >= 50) return false;
      }

      // Budget filter
      if (filters.budget !== 'all') {
        const cost = parseInt(destination.cost.match(/\d+/)?.[0] || '0');
        if (filters.budget === 'low' && cost > 500) return false;
        if (filters.budget === 'medium' && (cost <= 500 || cost > 1000)) return false;
        if (filters.budget === 'high' && cost <= 1000) return false;
      }

      // Weather filter
      if (filters.weather !== 'all') {
        const weatherType = destination.weather.toLowerCase();
        if (!weatherType.includes(filters.weather.toLowerCase())) return false;
      }

      // Coworking filter
      if (filters.hasCoworking && !destination.hasCoworking) return false;

      // Leisure filter
      if (filters.hasLeisure && !destination.hasLeisure) return false;

      return true;
    });

    setFilteredDestinations(filtered);
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading destinations...</div>;
  }

  return (
    <section className="destinations-section">
      <h2>Explore Top Remote Work Destinations in India</h2>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="destinations-grid">
        {filteredDestinations.map(destination => (
          <Link key={destination.id} to={`/destination/${destination.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <DestinationCard destination={destination} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Destinations; 
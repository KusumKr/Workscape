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

// Fallback list shown when Firestore has no data
const defaultDestinations: Destination[] = [
  {
    id: 'goa',
    name: 'Goa, Goa',
    image: '/goa.jpg',
    internetSpeed: '70 Mbps',
    weather: 'Tropical',
    cost: '800',
    description: 'Beautiful beaches and vibrant culture. A popular remote-work-friendly destination.',
    hasCoworking: true,
    hasLeisure: true,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru, Karnataka',
    image: '/bangalore.jpg',
    internetSpeed: '150 Mbps',
    weather: 'Mild',
    cost: '1200',
    description: 'India’s tech capital with excellent internet and a thriving startup ecosystem.',
    hasCoworking: true,
    hasLeisure: true,
  },
  {
    id: 'udaipur',
    name: 'Udaipur, Rajasthan',
    image: '/udaipur.jpg',
    internetSpeed: '60 Mbps',
    weather: 'Warm',
    cost: '700',
    description: 'The City of Lakes—scenic, calm, and great for focused work.',
    hasCoworking: false,
    hasLeisure: true,
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh, Uttarakhand',
    image: '/rishikesh.jpg',
    internetSpeed: '50 Mbps',
    weather: 'Cool',
    cost: '600',
    description: 'On the banks of the Ganges—mountains, yoga, and a peaceful vibe.',
    hasCoworking: false,
    hasLeisure: true,
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala, Himachal Pradesh',
    image: '/dharamshala.jpg',
    internetSpeed: '55 Mbps',
    weather: 'Cool',
    cost: '650',
    description: 'Himalayan foothills, fresh air, and serene surroundings.',
    hasCoworking: false,
    hasLeisure: true,
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry, Puducherry',
    image: '/pondicherry.jpg',
    internetSpeed: '80 Mbps',
    weather: 'Warm',
    cost: '750',
    description: 'French Quarter charm, beaches, and cafes—great for creative work.',
    hasCoworking: true,
    hasLeisure: true,
  },
];

interface FilterOptions {
  internetSpeed: string;
  budget: string;
  weather: string;
  state: string;
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
      // Merge Firestore results with defaults, prefer Firestore on id or name conflict
      const norm = (s: string) => s.trim().toLowerCase();
      const fetchedIds = new Set(fetched.map(d => d.id));
      const fetchedNames = new Set(
        fetched
          .map(d => d.name)
          .filter(Boolean)
          .map(n => norm(n))
      );
      const merged: Destination[] = [
        ...fetched,
        ...defaultDestinations.filter(d => !fetchedIds.has(d.id) && !fetchedNames.has(norm(d.name))),
      ];
      // Remove entries with missing/invalid images to avoid blank cards
      const withImages = merged.filter(d => typeof d.image === 'string' && d.image.trim().length > 4);
      setDestinations(withImages);
      setFilteredDestinations(withImages);
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

      // State/UT filter (expects destination.name like "City, State")
      if (filters.state !== 'all') {
        const stateFromName = destination.name.split(',')[1]?.trim().toLowerCase() || '';
        if (stateFromName !== filters.state.toLowerCase()) return false;
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
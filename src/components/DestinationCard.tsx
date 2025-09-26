import React, { useState, useEffect } from 'react';
import './DestinationCard.css';
import Reviews from './Reviews';
import WeatherWidget from './WeatherWidget';
import InternetSpeedWidget from './InternetSpeedWidget';
import CoworkingSpaceWidget from './CoworkingSpaceWidget';
import { db, auth } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';

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

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showWidgets, setShowWidgets] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, 'bookmarks'),
        where('userId', '==', auth.currentUser.uid),
        where('destinationId', '==', destination.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setBookmarked(true);
        setBookmarkId(querySnapshot.docs[0].id);
      } else {
        setBookmarked(false);
        setBookmarkId(null);
      }
    };
    checkBookmark();
  }, [destination.id]);

  const handleBookmark = async () => {
    if (!auth.currentUser) {
      alert('Please log in to bookmark destinations.');
      return;
    }
    if (bookmarked && bookmarkId) {
      await deleteDoc(doc(db, 'bookmarks', bookmarkId));
      setBookmarked(false);
      setBookmarkId(null);
    } else {
      const docRef = await addDoc(collection(db, 'bookmarks'), {
        userId: auth.currentUser.uid,
        destinationId: destination.id,
        destinationName: destination.name,
        destinationImage: destination.image
      });
      setBookmarked(true);
      setBookmarkId(docRef.id);
    }
  };

  const getCityName = (fullCityName: string) => {
    // Extracts the city name before a comma, e.g., "Goa" from "Goa, India"
    const parts = fullCityName.split(',');
    return parts[0].trim();
  };

  const extractInternetSpeed = (speedString: string) => {
    // Extracts the numerical speed and unit, e.g., "70 Mbps"
    const match = speedString.match(/(\d+\s*Mbps)/);
    return match ? match[1] : speedString; // Return original string if no match
  };

  return (
    <div className="destination-card">
      <div className="destination-image">
        <img src={destination.image} alt={destination.name} />
      </div>
      <div className="destination-content">
        <h3>{destination.name}</h3>
        <div className="destination-details">
          <p><strong>Internet:</strong> {destination.internetSpeed}</p>
          <p><strong>Weather:</strong> {destination.weather}</p>
          <p><strong>Cost:</strong> {destination.cost}</p>
          {destination.hasCoworking && <p className="feature-tag">Coworking Spaces Available</p>}
          {destination.hasLeisure && <p className="feature-tag">Leisure Activities</p>}
        </div>
        <p className="destination-description">{destination.description}</p>

        <div className="card-actions">
          <button 
            className="action-button"
            onClick={() => setShowWidgets(!showWidgets)}
          >
            {showWidgets ? 'Hide Data' : 'Show Live Data'}
          </button>
          <button 
            className="action-button"
            onClick={() => setShowReviews(!showReviews)}
          >
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </button>
          <button
            className="action-button"
            style={{ backgroundColor: bookmarked ? '#ffd700' : '#007bff', color: bookmarked ? '#333' : '#fff' }}
            onClick={handleBookmark}
          >
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>

        {showWidgets && (
          <div className="widgets-container">
            <WeatherWidget cityName={getCityName(destination.name)} />
            <InternetSpeedWidget speed={extractInternetSpeed(destination.internetSpeed)} />
            <CoworkingSpaceWidget available={destination.hasCoworking || false} />
          </div>
        )}

        {showReviews && <Reviews destinationName={destination.name} />}
      </div>
    </div>
  );
};

export default DestinationCard; 
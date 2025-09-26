import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WeatherWidget from './WeatherWidget';
import InternetSpeedWidget from './InternetSpeedWidget';
import CoworkingSpaceWidget from './CoworkingSpaceWidget';
import { db, auth } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs, getDoc } from 'firebase/firestore';

interface CoworkingSpace {
  name: string;
  distance: string;
}
interface Cafe {
  name: string;
  distance: string;
}
interface Destination {
  id: string;
  name: string;
  description: string;
  images?: string[];
  image?: string;
  internetSpeed: string;
  weather: string;
  cost: string;
  hasCoworking?: boolean;
  hasLeisure?: boolean;
  coworkingSpaces?: CoworkingSpace[];
  cafes?: Cafe[];
}

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      if (!id) return;
      const docRef = doc(db, 'destination', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDestination({ id: docSnap.id, ...docSnap.data() } as Destination);
      } else {
        setDestination(null);
      }
      setLoading(false);
    };
    fetchDestination();
  }, [id]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!auth.currentUser || !destination) return;
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
    if (destination) checkBookmark();
  }, [destination]);

  const handleBookmark = async () => {
    if (!auth.currentUser) {
      alert('Please log in to bookmark destinations.');
      return;
    }
    if (bookmarked && bookmarkId) {
      await deleteDoc(doc(db, 'bookmarks', bookmarkId));
      setBookmarked(false);
      setBookmarkId(null);
    } else if (destination) {
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

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading destination...</div>;
  if (!destination) return <div style={{ padding: '2rem' }}>Destination not found.</div>;

  // Use images array if present, else fallback to single image
  const galleryImages = destination.images && destination.images.length > 0 ? destination.images : destination.image ? [destination.image] : [];
  const coworkings = destination.coworkingSpaces || [];
  const cafes = destination.cafes || [];

  console.log('Image path:', destination.images && destination.images[0]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontWeight: 800, letterSpacing: 1 }}> {destination.name} </h2>
      {/* Image Gallery */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', justifyContent: 'center' }}>
        {galleryImages[0] && (
          <img
            src={galleryImages[0].trim()}
            alt={destination.name}
            style={{
              width: 220,
              height: 140,
              objectFit: 'cover',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}
          />
        )}
      </div>
      <p style={{ color: '#555', marginBottom: 32, textAlign: 'center', fontSize: 18 }}>{destination.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32, justifyContent: 'center' }}>
        <WeatherWidget cityName={destination.name.split(',')[0]} />
        <InternetSpeedWidget speed={destination.internetSpeed.match(/(\d+\s*Mbps)/)?.[1] || destination.internetSpeed} />
        <CoworkingSpaceWidget available={destination.hasCoworking || false} />
      </div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
        {/* Coworking Spaces */}
        <div style={{ background: '#f5faff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '1.5rem 2rem', minWidth: 260, flex: 1, maxWidth: 350 }}>
          <h3 style={{ textAlign: 'center', marginBottom: 16, fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>
            <span role="img" aria-label="coworking">💼</span> Coworking Spaces Nearby
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {coworkings.length === 0 ? <div style={{ color: '#888', textAlign: 'center' }}>No coworking spaces listed.</div> : coworkings.map((cw, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 8, padding: '0.75rem 1rem', boxShadow: '0 1px 3px rgba(25, 118, 210, 0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22, color: '#1976d2' }}>🏢</span>
                <span style={{ fontWeight: 600 }}>{cw.name}</span>
                <span style={{ marginLeft: 'auto', color: '#555', fontSize: 14 }}>{cw.distance}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Cafes */}
        <div style={{ background: '#fff8f5', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '1.5rem 2rem', minWidth: 260, flex: 1, maxWidth: 350 }}>
          <h3 style={{ textAlign: 'center', marginBottom: 16, fontWeight: 700, color: '#d2691e', letterSpacing: 0.5 }}>
            <span role="img" aria-label="cafe">☕</span> Cafes Nearby
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cafes.length === 0 ? <div style={{ color: '#888', textAlign: 'center' }}>No cafes listed.</div> : cafes.map((cafe, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 8, padding: '0.75rem 1rem', boxShadow: '0 1px 3px rgba(210, 105, 30, 0.07)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22, color: '#d2691e' }}>☕</span>
                <span style={{ fontWeight: 600 }}>{cafe.name}</span>
                <span style={{ marginLeft: 'auto', color: '#555', fontSize: 14 }}>{cafe.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <button
          style={{ backgroundColor: bookmarked ? '#ffd700' : '#1976d2', color: bookmarked ? '#333' : '#fff', border: 'none', borderRadius: 8, padding: '0.9rem 2.2rem', fontSize: 20, fontWeight: 700, boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)', cursor: 'pointer', transition: 'background 0.2s' }}
          onClick={handleBookmark}
        >
          {bookmarked ? 'Bookmarked' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default DestinationDetail; 
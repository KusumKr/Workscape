import React, { useState, useEffect } from 'react';
import './Reviews.css';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  destination: string;
}

interface ReviewsProps {
  destinationName: string;
}

const Reviews: React.FC<ReviewsProps> = ({ destinationName }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });
  const [loading, setLoading] = useState(false);

  // Fetch reviews from Firestore
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const q = query(
        collection(db, 'reviews'),
        where('destination', '==', destinationName),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedReviews.push({
          id: doc.id as any,
          userName: data.userName,
          rating: data.rating,
          comment: data.comment,
          date: data.date,
          destination: data.destination
        });
      });
      setReviews(fetchedReviews);
      setLoading(false);
    };
    fetchReviews();
  }, [destinationName]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim() || !newReview.userName.trim()) return;
    const review = {
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      destination: destinationName
    };
    await addDoc(collection(db, 'reviews'), review);
    setNewReview({ rating: 5, comment: '', userName: '' });
    // Refetch reviews
    const q = query(
      collection(db, 'reviews'),
      where('destination', '==', destinationName),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const fetchedReviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      fetchedReviews.push({
        id: doc.id as any,
        userName: data.userName,
        rating: data.rating,
        comment: data.comment,
        date: data.date,
        destination: data.destination
      });
    });
    setReviews(fetchedReviews);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="reviews-section">
      <h3>Reviews for {destinationName}</h3>
      
      {/* Add Review Form */}
      <form className="review-form" onSubmit={handleSubmitReview}>
        <div className="form-group">
          <label htmlFor="userName">Your Name:</label>
          <input
            type="text"
            id="userName"
            value={newReview.userName}
            onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                className={`star ${rating <= newReview.rating ? 'filled' : ''}`}
                onClick={() => setNewReview({ ...newReview, rating })}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Your Review:</label>
          <textarea
            id="comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Share your experience..."
            required
          />
        </div>

        <button type="submit" className="submit-review">Submit Review</button>
      </form>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <span className="reviewer-name">{review.userName}</span>
                <div className="rating">{renderStars(review.rating)}</div>
              </div>
              <span className="review-date">{review.date}</span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 
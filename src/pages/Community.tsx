import React, { useState } from 'react';
import '../styles/Community.css';

interface ForumPost {
  id: number;
  user: {
    name: string;
    avatar: string;
    location: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'events' | 'groups'>('forum');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 1,
      user: {
        name: 'Sarah K.',
        avatar: '/avatars/1.jpg',
        location: 'Bali, Indonesia'
      },
      title: 'Best co-working spaces in Ubud?',
      content: 'Hey everyone! Just arrived in Ubud and looking for recommendations for co-working spaces with good WiFi and a quiet environment. Any suggestions?',
      likes: 12,
      comments: 7,
      timeAgo: '2h ago',
      tags: ['coworking', 'bali', 'recommendations']
    },
    {
      id: 2,
      user: {
        name: 'Miguel R.',
        avatar: '/avatars/2.jpg',
        location: 'Lisbon, Portugal'
      },
      title: 'Digital Nomad Meetup this Friday',
      content: 'Organizing a casual meetup for digital nomads in Lisbon this Friday at 7 PM. We\'ll be at The Mill. Everyone is welcome!',
      likes: 24,
      comments: 5,
      timeAgo: '5h ago',
      tags: ['meetup', 'lisbon', 'events']
    },
    {
      id: 3,
      user: {
        name: 'Aisha M.',
        avatar: '/avatars/3.jpg',
        location: 'Bangkok, Thailand'
      },
      title: 'Tips for working across time zones?',
      content: 'I\'ll be working with a team spread across 4 different time zones. Any tips for managing meetings and collaboration effectively?',
      likes: 18,
      comments: 9,
      timeAgo: '1d ago',
      tags: ['remotework', 'productivity', 'collaboration']
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Bali Digital Nomad Festival',
      date: 'Oct 15-17, 2023',
      location: 'Ubud, Bali',
      attendees: 320,
      image: 'https://picsum.photos/400/300?random=7'
    },
    {
      id: 2,
      title: 'Lisbon Remote Work Summit',
      date: 'Nov 5, 2023',
      location: 'Lisbon, Portugal',
      attendees: 150,
      image: 'https://picsum.photos/400/300?random=8'
    },
    {
      id: 3,
      title: 'Bangkok Co-working Week',
      date: 'Dec 1-7, 2023',
      location: 'Bangkok, Thailand',
      attendees: 85,
      image: 'https://picsum.photos/400/300?random=9'
    }
  ]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const newPostObj: ForumPost = {
      id: posts.length + 1,
      user: {
        name: 'You',
        avatar: '/avatars/default.jpg',
        location: 'Current Location'
      },
      title: newPost.substring(0, 50) + (newPost.length > 50 ? '...' : ''),
      content: newPost,
      likes: 0,
      comments: 0,
      timeAgo: 'Just now',
      tags: ['discussion']
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  return (
    <div className="community-container">
      <div className="community-hero">
        <div className="hero-content">
          <h1>Join Our Global Community</h1>
          <p>Connect with fellow digital nomads, share experiences, and grow together</p>
        </div>
      </div>

      <div className="community-tabs">
        <button 
          className={`tab-btn ${activeTab === 'forum' ? 'active' : ''}`}
          onClick={() => setActiveTab('forum')}
        >
          Forum
        </button>
        <button 
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button 
          className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
      </div>

      <div className="community-content">
        {activeTab === 'forum' && (
          <div className="forum-container">
            <div className="create-post">
              <div className="user-avatar">
                <img src="/avatars/default.jpg" alt="Your avatar" />
              </div>
              <form onSubmit={handlePostSubmit} className="post-form">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="post-actions">
                  <div className="action-buttons">
                    <button type="button" className="action-btn" title="Add Image">
                      <span role="img" aria-label="Image">🖼️</span>
                    </button>
                    <button type="button" className="action-btn" title="Add Location">
                      <span role="img" aria-label="Location">📍</span>
                    </button>
                    <button type="button" className="action-btn" title="Add Tag">
                      <span role="img" aria-label="Tag">🏷️</span>
                    </button>
                  </div>
                  <button type="submit" className="post-btn">Post</button>
                </div>
              </form>
            </div>

            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="user-info">
                      <div className="avatar">
                        <img src={`https://i.pravatar.cc/150?img=${post.id + 3}`} alt={post.user.name} />
                      </div>
                      <div>
                        <h4>{post.user.name}</h4>
                        <p className="user-location">{post.user.location} • {post.timeAgo}</p>
                      </div>
                    </div>
                    <button className="post-options">•••</button>
                  </div>
                  
                  <div className="post-content">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                  
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="post-actions">
                    <button className="action">
                      <span role="img" aria-label="Like">👍</span> {post.likes}
                    </button>
                    <button className="action">
                      <span role="img" aria-label="Comment">💬</span> {post.comments}
                    </button>
                    <button className="action">
                      <span role="img" aria-label="Share">🔄</span> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-container">
            <div className="events-header">
              <h2>Upcoming Events</h2>
              <button className="create-event-btn">+ Create Event</button>
            </div>
            
            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <div 
                    className="event-image"
                    style={{ backgroundImage: `url(${event.image})` }}
                  ></div>
                  <div className="event-details">
                    <h3>{event.title}</h3>
                    <p className="event-date">📅 {event.date}</p>
                    <p className="event-location">📍 {event.location}</p>
                    <p className="event-attendees">👥 {event.attendees} attending</p>
                    <button className="rsvp-btn">RSVP</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="groups-container">
            <div className="groups-header">
              <h2>Popular Groups</h2>
              <button className="create-group-btn">+ Create Group</button>
            </div>
            
            <div className="groups-grid">
              {[1, 2, 3, 4, 5, 6].map(group => (
                <div key={group} className="group-card">
                  <div 
                    className="group-banner"
                    style={{ 
                      backgroundColor: ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'][group % 6]
                    }}
                  ></div>
                  <div className="group-info">
                    <h3>Digital Nomads {group === 1 ? 'Bali' : group === 2 ? 'Lisbon' : 'Worldwide'}</h3>
                    <p className="group-members">👥 {Math.floor(Math.random() * 1000) + 100} members</p>
                    <p className="group-description">
                      {group === 1 
                        ? 'Connect with digital nomads in Bali' 
                        : group === 2 
                        ? 'Lisbon digital nomad community' 
                        : 'Global community of remote workers'}
                    </p>
                    <button className="join-btn">
                      {group % 2 === 0 ? 'Join Group' : 'Request to Join'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;

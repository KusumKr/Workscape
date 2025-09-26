import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/workscape-animation.json';
import './Auth.css'; // We'll use a common CSS file for Auth pages
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optionally redirect or show success
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-animation">
        <Lottie options={defaultOptions} height={520} width={520} />
      </div>
      <div className="auth-form-card">
        <div className="auth-tagline">Welcome back! 🚀</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-switch-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import DestinationDetail from './components/DestinationDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Destinations />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          {/* You can add more routes here for other pages */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

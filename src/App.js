import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gold from './pages/Gold';
import Silver from './pages/Silver';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/gold" element={<Gold />} />
            <Route path="/silver" element={<Silver />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

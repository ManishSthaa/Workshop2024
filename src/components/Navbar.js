import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Gold Exchange</Link>
      <div className="navbar-links">
        <Link to="/gold" className="navbar-link">Gold</Link>
        <Link to="/silver" className="navbar-link">Silver</Link>
      </div>
    </nav>
  );
};

export default Navbar;

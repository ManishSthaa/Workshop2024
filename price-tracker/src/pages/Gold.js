import React from 'react';
import PriceTable from '../components/PriceTable';
import './cs/Banner.css'; // Import CSS for styling

const Gold = () => {
  return (
    <div>
      <div className="banner gold-banner">
        <h2>Gold Prices</h2>
      </div>
      <PriceTable type="Gold" />
    </div>
  );
};

export default Gold;

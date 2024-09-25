import React from 'react';
import PriceTable from '../components/PriceTable';
import './cs/Banner.css'; // Import CSS for styling

const Silver = () => {
  return (
    <div>
      <div className="banner silver-banner">
        <h2>Silver Prices</h2>
      </div>
      <PriceTable type="Silver" />
    </div>
  );
};

export default Silver;

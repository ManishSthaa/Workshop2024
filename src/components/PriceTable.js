import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './css/PriceTable.css';  // Import the CSS file for styling

const PriceTable = ({ type }) => {
  const [data, setData] = useState([]);  // Store all data
  const [filteredData, setFilteredData] = useState([]);  // Store filtered data
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [error, setError] = useState(null);

  // Load the correct CSV file based on the type (Gold or Silver)
  useEffect(() => {
    const fetchData = async () => {
      let file;
      if (type === 'Gold') {
        file = '/gold_prices.csv';  // Update with the correct path
      } else if (type === 'Silver') {
        file = '/silver_prices.csv';  // Update with the correct path
      }

      try {
        const response = await fetch(file);
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        const result = await reader.read();
        const csv = decoder.decode(result.value);
        
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);  // Store the parsed data
          },
        });
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [type]);

  // Function to filter the data when Search is clicked
  const handleSearch = () => {
    const dateField = type === 'Gold' ? 'Date (MM/YY/DD)' : 'Date';
    let filtered = data;

    if (selectedYear) {
      filtered = filtered.filter(row => row[dateField].split('/')[1] === selectedYear);  // Year is in index 1
    }
    if (selectedMonth) {
      filtered = filtered.filter(row => row[dateField].split('/')[0] === selectedMonth);  // Month is in index 0
    }
    if (selectedDay) {
      filtered = filtered.filter(row => row[dateField].split('/')[2] === selectedDay);  // Day is in index 2
    }

    setFilteredData(filtered);
  };

  // Extract unique years, months, and days for dropdown options
  const extractParts = (index) => [...new Set(data.map(row => (type === 'Gold' ? row['Date (MM/YY/DD)'] : row.Date).split('/')[index]))];

  const uniqueYears = extractParts(1);  // Year is in index 1
  const uniqueMonths = extractParts(0);  // Month is in index 0
  const uniqueDays = extractParts(2);  // Day is in index 2

  return (
    <div className="price-table-container">
      <h3 className="price-table-title">{type} Prices</h3>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="dropdown-container">
            <select className="dropdown" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">Year</option>
              {uniqueYears.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>

            <select className="dropdown" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">Month</option>
              {uniqueMonths.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select className="dropdown" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
              <option value="">Day</option>
              {uniqueDays.map((day, index) => (
                <option key={index} value={day}>{day}</option>
              ))}
            </select>

            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>

          <table className="price-table">
            <thead>
              <tr>
                <th>Date</th>
                {type === 'Gold' ? (
                  <>
                    <th>Fine Gold</th>
                    <th>Standard Gold</th>
                  </>
                ) : (
                  <th>Silver Price</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{type === 'Gold' ? row['Date (MM/YY/DD)'] : row.Date}</td>
                    {type === 'Gold' ? (
                      <>
                        <td>{row['Fine Gold']}</td>
                        <td>{row['Standard Gold']}</td>
                      </>
                    ) : (
                      <td>{row.Silver}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={type === 'Gold' ? 3 : 2}>No data available for the selected date</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PriceTable;

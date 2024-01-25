import React, { useState, useEffect } from 'react';

function Watchlist() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch stock data from the API
    fetch('http://localhost:3000/api/stocks/')
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Watchlist Section</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock._id}>
            <strong>{stock.symbol}</strong> - {stock.currentPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;

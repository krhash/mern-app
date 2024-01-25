import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import QuantityModal from './quantityModal'; // Import the QuantityModal component

function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [visibleStocks, setVisibleStocks] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [operationType, setOperationType] = useState(null);

  useEffect(() => {
    // Fetch stock data from the API
    fetch('http://localhost:3000/api/stocks/')
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleStocks(stocks.slice(startIndex, endIndex));
  }, [currentPage, stocks]);

  const handleOperationClick = (symbol, type) => {
    setSelectedStock(symbol);
    setOperationType(type);
    setModalOpen(true);
  };

  const handleOperationConfirm = ({ symbol, quantity }) => {
    const apiUrl = operationType === 'buy' ? 'http://localhost:3000/api/trade?operation=buy' : 'http://localhost:3000/api/trade?operation=sell';

    const stock = stocks.find((s) => s.symbol === symbol);

    if (!stock) {
      console.error(`Stock with symbol ${symbol} not found.`);
      return;
    }
    
    const payload = {
      symbol,
      price: stock.currentPrice, // You can adjust the default price as needed
      quantity,
    };

    // Make POST request to the API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`${operationType} successful:`, data);
        // You may want to update the UI or handle success in other ways
      })
      .catch((error) => console.error(`Error ${operationType}ing:`, error));

    setModalOpen(false);
  };

  return (
    <div style={{ width: '400px', height: '1000px', overflow: 'auto' }}>
      <h2>Watchlist Section</h2>
      <List>
        {visibleStocks.map((stock) => (
          <ListItem key={stock._id}>
            <ListItemText primary={<strong>{stock.symbol}</strong>} secondary={`Price: ${stock.currentPrice}`} />
            <Button
              variant="contained"
              style={{ backgroundColor: '#4CAF50', color: 'white', marginLeft: '8px' }}
              onClick={() => handleOperationClick(stock.symbol, 'buy')}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#FF6347', color: 'white', marginLeft: '8px' }}
              onClick={() => handleOperationClick(stock.symbol, 'sell')}
            >
              Sell
            </Button>
          </ListItem>
        ))}
      </List>
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 8px' }}>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(stocks.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(stocks.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      {/* Render QuantityModal */}
      <QuantityModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleOperationConfirm} operation={operationType} symbol={selectedStock} />
    </div>
  );
}

export default Watchlist;

import React, { useState } from 'react';
import Watchlist from './components/watchlist';
import Portfolio from './components/portfolio';
import './App.css'; // Create an App.css file for styling

function App() {
  const [activeSection, setActiveSection] = useState('watchlist');

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={activeSection === 'watchlist' ? 'active-tab' : ''}
          onClick={() => setActiveSection('watchlist')}
        >
          Watchlist
        </button>
        <button
          className={activeSection === 'portfolio' ? 'active-tab' : ''}
          onClick={() => setActiveSection('portfolio')}
        >
          Portfolio
        </button>
      </div>

      {activeSection === 'watchlist' ? <Watchlist /> : <Portfolio />}
    </div>
  );
}

export default App;
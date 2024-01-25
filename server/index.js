// app.js
const express = require('express');
const StockData = require('./model/stockData');
const { SERVER_HOST, SERVER_PORT } = require('./constants');
const stockDataRoutes = require('./routes/stockData')
const tradeRoutes = require('./routes/trade')
const cors = require('cors');

const app = express();

app.get('/home', (req, res) => {
    res.sendFile('C:/Users/krush/OneDrive/Documents/Web Application Development/MERN Application/mern-app/server/home.html');
});

app.use(cors({
    'origin' : 'http://localhost:3001'
}))

// Use JSON middleware for POST request parsing
app.use(express.json())

app.use('/api/stocks', stockDataRoutes)

app.use('/api/trade', tradeRoutes)

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server running on ${SERVER_HOST}:${SERVER_PORT}`);
});

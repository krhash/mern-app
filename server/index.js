const express = require('express');
const { readFile } = require('fs');
const mongoose = require('mongoose');
const StockData = require('./model/stockData');

const app = express();

app.get('/home', (req, res) => {
    res.send('hello');
}
)

async function printStockData() {
    try {
        const dbName = 'tradingApp';
        const dbUri = `mongodb://localhost:27017/${dbName}`

        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

        const result = await StockData.find({});

        console.log('Stock Data: ');
        console.log(result);
    } catch(error) {
        console.error('Error: ', error.message);
    } finally {
        mongoose.connection.close();
    }
}

printStockData();

app.listen(3000, 'localhost', () => {
    console.log('Server running on port 3000');
})
const mongoose = require('mongoose')

const stockDataSchema = new mongoose.Schema({
    symbol: String,
    currentPrice: Number,
    highPrice: Number,
    lowPrice: Number,
    industryType: String
})

const StockData = mongoose.model('StockData', stockDataSchema, 'stockData');

module.exports = StockData;
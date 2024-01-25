const StockData = require('../model/stockData');
const { connectToDatabase } = require('../dbConnector');

const getAllStocksData = async (req, res) => {
    await connectToDatabase();

    // Retrieve stocks data from db
    const result = await StockData.find({})
    res.json(result)
}

const getStockDataBySymbol = async(req, res) => {
    await connectToDatabase();

    //Symbol is part of path parameter in the URL
    const symbol = req.params.symbol

    if (symbol) {
        // Retrieve stocks data from db
        const result = await StockData.find({ 'symbol': symbol.toUpperCase() });
        res.json(result);
    } else {
        res.sendStatus(404).send(`Symbol not found: ${symbol}`)
    }
}

module.exports = {
    getAllStocksData,
    getStockDataBySymbol
}
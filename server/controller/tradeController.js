const Trade = require('../model/trade');
const StockData = require('../model/stockData');
const { connectToDatabase } = require('../dbConnector');

const executeTrade = async (req, res) => {
  const { symbol, price, quantity } = req.body

  // read operation from queryParam
  const operation = req.query.operation

  try {
    if (operation && operation.toLowerCase() == 'buy') {
      res.json(await buy(symbol, price, quantity));
  
    } else if (operation && operation.toLowerCase() == 'sell') {
      res.json(await sell(symbol, price, quantity));
  
    }
  } catch (err) {
    res.send('Error in executing trade: ' + err);
  }
}

const buy = async(symbol, buyPrice, quantity) => {
  try {
    // Validate quantity
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0.');
    }

    // Get the current price of the asset
    const currentPrice = await getCurrentPrice(symbol);

    // Validate buy price
    if (buyPrice > currentPrice) {
      throw new Error('Buy price cannot be higher than the current price.');
    }

    await connectToDatabase();

    const existingTrade = await Trade.findOne({ 'symbol' : symbol.toUpperCase() });

    if (existingTrade) {
      // Update the existing document by adding the quantity
      const newQuantity = existingTrade.quantity + quantity;

      const avgPrice = ((existingTrade.price * existingTrade.quantity) + (buyPrice * quantity)) / newQuantity

      existingTrade.quantity = newQuantity
      existingTrade.price = avgPrice

      return await existingTrade.save();
    } else {
      // Create a new trade document if it doesn't exist
      return await Trade.create({ symbol, quantity, price});
    }

  } catch (error) {
    console.error('Error executing buy order:', error.message);
    throw "Cannot execute buy order" + error.message
  }
}
const sell = async(symbol, sellPrice, quantity) => {
  try {
    // Validate quantity
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0.');
    }

    // Get the current price of the asset
    const currentPrice = await getCurrentPrice(symbol);

    // Validate sell price
    if (sellPrice < currentPrice) {
      throw new Error('Sell price cannot be lower than the current price.');
    }

    await connectToDatabase();
    // Check if there's enough quantity to sell
    const existingTrade = await Trade.findOne({ 'symbol' : symbol.toUpperCase() });
    if (!existingTrade || existingTrade.quantity < quantity) {
      throw new Error('Not enough quantity available to sell.');
    }

    // Update the existing trade document for selling
    existingTrade.quantity -= quantity;
    await existingTrade.save();

    return existingTrade;

  } catch (error) {
    console.error('Error executing sell order:', error.message);
    throw "Cannot execute sell order" + error.message
  }
}

const getCurrentPrice = async(symbol) => {
  try {
    await connectToDatabase();

    // Retrieve the current price from the stockData collection
    const stockData = await StockData.findOne({ 'symbol': symbol.toUpperCase() });

    if (!stockData) {
      throw new Error('Stock data not found for the specified symbol.');
    }

    return stockData.currentPrice;
  } catch (error) {
    console.error('Error getting current price:', error.message);
    throw 'Error getting current price:' + error.message;
  }
}

module.exports = {
  executeTrade
}
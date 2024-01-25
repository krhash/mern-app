var express = require('express')
var {getAllStocksData, getStockDataBySymbol} = require('../controller/stockDataController')

const router = express.Router()

router.get('/', getAllStocksData)

router.get('/:symbol', getStockDataBySymbol)

module.exports = router
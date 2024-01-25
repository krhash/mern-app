var express = require('express')
var { executeTrade, getAllTrades } = require('../controller/tradeController')

const router = express.Router()

router.post('/', executeTrade)

router.get('/', getAllTrades)

module.exports = router
var express = require('express')
var { executeTrade } = require('../controller/tradeController')

const router = express.Router()

router.post('/', executeTrade)

module.exports = router
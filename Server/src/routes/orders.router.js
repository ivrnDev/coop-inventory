const express = require('express');
const router = express.Router();
const { createOrder, getTransactions } = require('../api/orders/orders.controllers');

router.post('/', createOrder)

router.get('/transactions', getTransactions);


module.exports = router;
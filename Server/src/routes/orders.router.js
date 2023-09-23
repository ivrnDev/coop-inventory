const express = require('express');
const router = express.Router();
const { createOrder, getTransactions } = require('../api/orders/orders.controllers');
// const { getCustomers } = require('../api/customers/customers.controllers.js')

router.post('/', createOrder)

// router.get('/customers', getCustomers);
router.get('/transactions', getTransactions);


module.exports = router;
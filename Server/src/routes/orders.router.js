const express = require('express');
const router = express.Router();
const {createOrders} = require('../api/orders/orders.controllers');

router.post('/', createOrders);

module.exports = router;
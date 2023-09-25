const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../api/orders/orders.controllers');
const { getAllTransactions, updateTransactionStatus, updateOrderStatus } = require('../api/transactions/transactions.controller')

router.get('/', getAllOrders);
router.post('/', createOrder);
router.post('/updateStatus', updateOrderStatus);
router.get('/transactions', getAllTransactions);
router.post('/transactions/updateStatus', updateTransactionStatus);



module.exports = router;
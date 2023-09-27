const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderbyId, updateOrderStatus} = require('../controllers/orders.controllers')
const { getAllTransactions, updateTransactionStatus, getTransactionById } = require('../controllers/transactions.controller')

router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/', getOrderbyId);
router.get('/:id', getOrderbyId);
router.post('/updateStatus', updateOrderStatus);




module.exports = router;
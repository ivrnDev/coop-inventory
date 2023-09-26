const express = require('express');
const router = express.Router();
const {getAllOrders, createOrder, updateOrderStatus} = require('../controllers/orders.controllers')
const { getAllTransactions, updateTransactionStatus, getTransactionById } = require('../controllers/transactions.controller')

router.get('/', getAllOrders);
router.post('/', createOrder);
router.post('/updateStatus', updateOrderStatus);
router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getTransactionById);

router.post('/transactions/updateStatus', updateTransactionStatus);



module.exports = router;
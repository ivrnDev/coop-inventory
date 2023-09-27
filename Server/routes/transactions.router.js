const express = require('express');
const router = express.Router();

const { getAllTransactions, getTransactionById, updateTransactionStatus, updateOrderStatus } = require('../controllers/transactions.controller')

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.patch('/:id/status', updateTransactionStatus);
router.patch('/order/:id/status', updateOrderStatus);
module.exports = router;
const express = require('express');
const router = express.Router();

const { getAllTransactions, getTransactionById, updateTransactionStatus } = require('../controllers/transactions.controller')

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', updateTransactionStatus);

module.exports = router;
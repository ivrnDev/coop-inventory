const express = require('express');
const router = express.Router();

const { getAllTransactions, getAllFilteredTransactions, getTransactionById, updateTransactionStatus } = require('../controllers/transactions.controller')

router.get('/', getAllTransactions);
router.get('/filter/list', getAllFilteredTransactions); //receive filter query : completed, cancelled, all, pending
router.get('/:id', getTransactionById);
router.patch('/:id/status', updateTransactionStatus);
module.exports = router;
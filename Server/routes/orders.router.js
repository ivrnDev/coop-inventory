const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderbyId, getOrderbyTransactionId} = require('../controllers/orders.controllers')


router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/', getOrderbyId);
router.get('/:id', getOrderbyId);
router.get('/transaction/list', getOrderbyTransactionId); //receive params transaction_id





module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderbyId} = require('../controllers/orders.controllers')


router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/', getOrderbyId);
router.get('/:id', getOrderbyId);





module.exports = router;
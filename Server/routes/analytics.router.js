const express = require('express');
const router = express.Router();
const { getOrderAnalytics, getProductSales, sales } = require('../controllers/analytics.controller')

router.get('/orders', getOrderAnalytics);
router.get('/products', getProductSales);
router.get('/sales', sales);










module.exports = router;
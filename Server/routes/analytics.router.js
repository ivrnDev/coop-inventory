const express = require('express');
const router = express.Router();
const { getOrderAnalytics } = require('../controllers/analytics.controller')

router.get('/orders', getOrderAnalytics);
router.get('/orders', getOrderAnalytics);










module.exports = router;
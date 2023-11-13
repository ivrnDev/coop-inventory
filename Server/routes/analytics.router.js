const express = require('express');
const router = express.Router();
const { getOrderAnalytics } = require('../controllers/analytics.controller')
// router.post('/', upload.single('profile_picture'), createNewAdmin);
// router.patch('/:id', upload.single('profile_picture'), updateAdmin);
// router.get('/', getAllAdmins);
router.get('/orders', getOrderAnalytics);









module.exports = router;
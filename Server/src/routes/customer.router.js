const express = require('express');
const router = express.Router();
const {getCustomers, createCustomer} = require('../api/customers/customers.controller');


router.get('/', getCustomers);
router.post('/', createCustomer);


module.exports = router;

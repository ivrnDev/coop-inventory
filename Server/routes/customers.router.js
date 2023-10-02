const express = require("express");
const { getCustomers, getCustomerById, createCustomer } = require("../controllers/customer.controller");
const router = express.Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.get('/:id', getCustomerById);

module.exports = router;
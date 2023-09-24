const express = require("express");
const { getCustomers } = require("../api/customers/customer.controller");
const router = express.Router();

router.get('/', getCustomers);

module.exports = router;
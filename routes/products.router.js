const { createProduct, getProducts } = require('../api/products.controller.js') 
const express =  require('express');
const router = express.Router();


router.post('/', createProduct)
router.get('/', getProducts);
// router.get('/')
module.exports = router;

  
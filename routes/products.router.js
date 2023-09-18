const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct
 } = require('../api/products/products.controller.js')
const express = require('express');
const router = express.Router();


router.post('/', createProduct);
router.get('/', getProducts);
router.patch('/:id', updateProducts);
router.delete('/:id', deleteProduct)
module.exports = router;


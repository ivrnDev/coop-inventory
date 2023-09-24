const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct
 } = require('../api/products/products.controller.js')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');


router.post('/', upload.single('productImage'), createProduct);
router.get('/', getProducts);
router.patch('/:id', upload.single('productImage'), updateProducts);
// router.delete('/:id', deleteProduct)

module.exports = router;
const {
  createProduct,
  getProducts,
  updateProducts,
  getProductById,
 } = require('../api/products/products.controller.js')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.js');


router.post('/', upload.single('product_image'), createProduct);
router.get('/', getProducts);
router.patch('/:id', upload.single('product_image'), updateProducts);
router.get('/:id', getProductById)
// router.delete('/:id', deleteProduct)

module.exports = router;
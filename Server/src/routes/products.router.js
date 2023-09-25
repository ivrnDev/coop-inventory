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
router.patch('/:id', upload.single('product_image'), updateProducts);
router.get('/', getProducts);
router.get('/:id', getProductById)


module.exports = router;
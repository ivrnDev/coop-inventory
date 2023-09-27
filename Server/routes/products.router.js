const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
} = require('../controllers/products.controller')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');


router.get('/', getAllProducts); //Get all Products
router.post('/', upload.single('product_image'), createProduct); // Create new product
router.get('/:id', getProductById) //Get product by ID
router.patch('/:id', upload.single('product_image'), updateProducts); // Update product by ID


module.exports = router;
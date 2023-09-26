const {
  createProduct,
  createProductAlbum,
  getAllProducts,
  updateProducts,
  getProductById,
 } = require('../controllers/products.controller')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
 
 
router.post('/', upload.single('product_image'), createProduct);
router.post('/album/upload', upload.array('product_album', 10), createProductAlbum)
router.patch('/:id', upload.single('product_image'), updateProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById)


module.exports = router;
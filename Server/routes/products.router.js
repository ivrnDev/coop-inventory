const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  getAllVariant,
  getVariantById,
  updateProductStocks,
  updateVariantStocks, 
  updateProductSold
} = require('../controllers/products.controller')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

router.get('/', getAllProducts); 
router.post('/', upload.single('product_image'), createProduct);  
router.get('/:id', getProductById)  
router.patch('/:id', upload.single('product_image'), updateProducts);  
router.patch('/:id/sold', updateProductSold);  //Receive query and params action/value
router.get('/variant/list', getAllVariant);  
router.get('/variant/list/:id', getVariantById);  
router.patch('/:id/stock', updateProductStocks);  //Receive query and params action/value
router.patch('/variant/list/:id/stock', updateVariantStocks);  //Receive query and params action/value




module.exports = router;
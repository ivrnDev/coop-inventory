const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  getAllVariants,
  getVariantById,
  updateProductStocks,
  updateVariantStocks, 
  updateProductSold,
  getAllCategory,
  getCategoryById,
  createNewCategory,
  updateCategoryById
} = require('../controllers/products.controller')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

router.get('/', getAllProducts); 
router.post('/', upload.single('product_image'), createProduct);  
router.get('/:id', getProductById)  
router.patch('/:id', upload.single('product_image'), updateProducts);  

router.patch('/:id/sold', updateProductSold);  //Receive query and params `action=add/value=15` e.g

router.get('/variant/list', getAllVariants);  
router.get('/variant/list/:id', getVariantById);  
router.patch('/:id/stock', updateProductStocks);  //Receive query and params `action=add/value=15` e.g
router.patch('/variant/list/:id/stock', updateVariantStocks);  //Receive query and params action/value

router.post('/category', upload.single('category_image'), createNewCategory);  
router.patch('/category/:id', upload.single('category_image'), updateCategoryById);  
router.get('/category/list', getAllCategory);  
router.get('/category/:id', getCategoryById);  



module.exports = router;
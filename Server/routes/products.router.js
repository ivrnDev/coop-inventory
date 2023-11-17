const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  deleteProductById,
  getAllVariants,
  getVariantById,
  getVariantByProductId,
  deleteVariants,
  createVariants,
  updateProductStocks,
  updateVariant,
  updateVariantStocks,
  updateProductSold,
  getAllCategory,
  getCategoryById,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
  updateProductImage,
  getProductByFeatured,
  getDeletedProducts,

} = require('../controllers/products.controller')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

router.get('/', getAllProducts);
router.post('/', upload.fields([{ name: 'display_image', maxCount: 1 }, { name: 'product_album', maxCount: 10 }]), createProduct);
router.get('/:id', getProductById)
router.get('/deleted/list', getDeletedProducts)
router.get('/featured/list', getProductByFeatured)
router.patch('/:id', upload.fields([{ name: 'display_image', maxCount: 1 }, { name: 'product_album', maxCount: 10 }]), updateProducts);
router.patch('/image/:id', upload.single('display_image'), updateProductImage);

router.patch('/:id/sold', updateProductSold);  //Receive query and params `action=add/value=15` e.g

router.patch('/:id/delete', deleteProductById);

router.get('/variant/list', getAllVariants);
router.post('/variant/list/new/:id', createVariants);
router.get('/variant/list/item', getVariantByProductId); //Receive query
router.get('/variant/list/:id', getVariantById);
router.delete('/variant/list', deleteVariants); //Receive query params product_id and variat_id
router.patch('/:id/stock', updateProductStocks);  //Receive query and params `action=add/value=15` e.g
router.patch('/variant/list/:id/stock', updateVariantStocks);  //Receive query and params action/value
router.patch('/variant/list/:id/update', updateVariant);

router.post('/category', upload.single('category_image'), createNewCategory);
router.patch('/category/:id', upload.single('category_image'), updateCategoryById);
router.patch('/category/action/:id', deleteCategoryById); //Params (action) 
router.get('/category/list', getAllCategory);
router.get('/category/:id', getCategoryById);





module.exports = router;
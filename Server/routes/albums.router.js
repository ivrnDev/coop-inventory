const { 
  createProductAlbum,
  getAllAlbums,
  getAlbumById,
  getProductAlbumById,
  updateProductAlbumImage
 } = require('../controllers/albums.controller')
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

router.get('/', getAllAlbums); 
router.post('/product', upload.array('product_album', 10), createProductAlbum); 
router.patch('/product/:id', upload.single("product_image"), updateProductAlbumImage)
router.get('/:id', getAlbumById); 
router.get('/product/search', getProductAlbumById); 

module.exports = router;
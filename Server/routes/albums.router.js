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

router.get('/', getAllAlbums); //Get all albums list
router.post('/product', upload.array('product_album', 10), createProductAlbum); //Upload new album
router.patch('/product/:id', upload.single("product_image"), updateProductAlbumImage)
router.get('/:id', getAlbumById); //Get albums by photo ID
router.get('/product/search', getProductAlbumById); //Get albums by product_id ID(Query Params)

module.exports = router;
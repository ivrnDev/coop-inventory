const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct
 } = require('../api/products/products.controller.js')
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const uploadDirectory = './images';

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.originalname}`;
    callback(null, filename);
  }
});

const upload = multer({ storage: storage });



router.post('/', upload.single('productImage'), createProduct);
router.get('/', getProducts);
router.patch('/:id', upload.single('productImage'), updateProducts);
router.delete('/:id', deleteProduct)

module.exports = router;


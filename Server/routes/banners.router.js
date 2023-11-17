const express = require("express");
const { getAllBanners, getBannerById, createBanner, updateBanner } = require("../controllers/banners.controller");
const router = express.Router();
const upload = require('../middleware/multer');

router.post('/', upload.array('banner_image', 10), createBanner);
router.patch('/:id', upload.array('banner_image', 10), updateBanner);
router.get('/', getAllBanners);
router.get('/:id', getBannerById);

module.exports = router;															
const express = require("express");
const { getAllBanners, getBannerById, createBanner, updateBanner  } = require("../controllers/banners.controller");
const router = express.Router();
const upload = require('../middleware/multer');

router.post('/', upload.single('banner_image'), createBanner);
router.patch('/:id', upload.single('banner_image'), updateBanner);
router.get('/', getAllBanners);
router.get('/:id', getBannerById);

module.exports = router;															
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { createNewAdmin, updateAdmin, getAllAdmins, getAdminById } = require('../controllers/admins.controller');
createNewAdmin
router.post('/', upload.single('profile_picture'), createNewAdmin);
router.patch('/:id', updateAdmin);
router.get('/', getAllAdmins);
router.get('/list/1', getAdminById);







module.exports = router;
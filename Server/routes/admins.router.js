const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { createNewAdmin, updateAdmin, getAllAdmins, getAdminById, getAdminPermission } = require('../controllers/admins.controller');
createNewAdmin
router.post('/', upload.single('profile_picture'), createNewAdmin);
router.patch('/:id', upload.single('profile_picture'), updateAdmin);
router.get('/', getAllAdmins);
router.get('/list/:id', getAdminById);
router.post('/permission/list', getAdminPermission); // Admin Roles and Permissions(id, role)







module.exports = router;
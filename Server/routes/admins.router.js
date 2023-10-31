const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
  createNewAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  getAdminPermission,
  createNewActivity,
  getAllActivities,
  getActivityById
} = require('../controllers/admins.controller');
router.post('/', upload.single('profile_picture'), createNewAdmin);
router.patch('/:id', upload.single('profile_picture'), updateAdmin);
router.get('/', getAllAdmins);
router.get('/list/:id', getAdminById);
router.post('/permission/list', getAdminPermission); // Admin Roles and Permissions(id, role)

router.post('/activity/recent/list', createNewActivity);
router.get('/activity/recent/list', getAllActivities);
router.get('/activity/recent/list/:id', getActivityById);








module.exports = router;
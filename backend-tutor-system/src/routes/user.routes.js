const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Tất cả các API dưới đây đều cần đăng nhập (verifyToken)
router.get('/me', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, userController.updateProfile);

module.exports = router;
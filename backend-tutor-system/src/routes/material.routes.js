const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Upload tài liệu (Cần Token + Middleware Multer)
router.post('/', verifyToken, materialController.uploadMiddleware, materialController.uploadMaterial);

// Xem tài liệu (Cần Token)
router.get('/', verifyToken, materialController.getMaterials);

module.exports = router;
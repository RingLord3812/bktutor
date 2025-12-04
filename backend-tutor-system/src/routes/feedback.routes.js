const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Sinh viên gửi đánh giá
router.post('/', verifyToken, feedbackController.createFeedback);

// Xem đánh giá của Tutor (Ai cũng xem được)
router.get('/', feedbackController.getTutorFeedbacks);

module.exports = router;
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Lấy danh sách các đoạn chat
router.get('/conversations', verifyToken, chatController.getConversations);

// Lấy nội dung tin nhắn của 1 đoạn chat
router.get('/conversations/:conversationId/messages', verifyToken, chatController.getMessages);

// Gửi tin nhắn
router.post('/messages', verifyToken, chatController.sendMessage);

// Bắt đầu chat với ai đó (Tạo phòng chat)
router.post('/conversations', verifyToken, chatController.startConversation);

module.exports = router;
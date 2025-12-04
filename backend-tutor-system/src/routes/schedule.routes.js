const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Tutor tạo lịch
router.post('/slots', verifyToken, scheduleController.createSlot);

// Xem lịch (Public hoặc cần login đều được, ở đây mình để cần login)
router.get('/slots',  scheduleController.getSlots);

module.exports = router;
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// API: Đặt lịch (Chỉ sinh viên)
router.post('/', verifyToken, bookingController.createBooking);

// API: Xem lịch sử đặt (Cả 2 đều xem được)
router.get('/me', verifyToken, bookingController.getBookings);

module.exports = router;
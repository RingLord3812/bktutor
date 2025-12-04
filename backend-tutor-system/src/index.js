const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import các routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const scheduleRoutes = require('./routes/schedule.routes');
const bookingRoutes = require('./routes/booking.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const chatRoutes = require('./routes/chat.routes');
const path = require('path'); // Import thêm thư viện path
const materialRoutes = require('./routes/material.routes'); // Import route mới

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Đọc dữ liệu JSON từ body

// Định nghĩa Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/chat', chatRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/materials', materialRoutes);

// Chạy Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
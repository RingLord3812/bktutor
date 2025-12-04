const db = require('../config/db');

// Gửi đánh giá (Student)
const createFeedback = async (req, res) => {
    try {
        const studentId = req.user.id;
        const role = req.user.role;
        const { booking_id, rating, comment } = req.body;

        if (role !== 'student') {
            return res.status(403).json({ message: 'Chỉ sinh viên mới được đánh giá' });
        }

        // 1. Kiểm tra Booking có tồn tại và thuộc về sinh viên này không
        const [bookings] = await db.query(
            'SELECT * FROM bookings WHERE booking_id = ? AND student_user_id = ?',
            [booking_id, studentId]
        );

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy lịch hẹn này' });
        }

        const booking = bookings[0];

        // 2. Validate: Chỉ cho phép đánh giá nếu trạng thái là 'Completed'
        // (Hoặc bạn có thể check theo thời gian: nếu now > end_time)
        /* if (booking.status !== 'Completed') {
             return res.status(400).json({ message: 'Chỉ được đánh giá khi buổi học đã hoàn thành' });
        }
        */

        // 3. Kiểm tra xem đã đánh giá chưa (tránh spam)
        const [exist] = await db.query('SELECT * FROM student_feedback WHERE booking_id = ?', [booking_id]);
        if (exist.length > 0) {
            return res.status(400).json({ message: 'Bạn đã đánh giá buổi học này rồi' });
        }

        // 4. Insert Feedback
        await db.query(
            `INSERT INTO student_feedback (booking_id, student_user_id, rating, comment)
             VALUES (?, ?, ?, ?)`,
            [booking_id, studentId, rating, comment]
        );

        res.status(201).json({ success: true, message: 'Gửi đánh giá thành công!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// Xem đánh giá của một Tutor (Public)
const getTutorFeedbacks = async (req, res) => {
    try {
        const { tutor_id } = req.query;
        
        const query = `
            SELECT sf.rating, sf.comment, sf.created_at, u.full_name as student_name
            FROM student_feedback sf
            JOIN bookings b ON sf.booking_id = b.booking_id
            JOIN tutor_slots ts ON b.tutor_slot_id = ts.slot_id
            JOIN users u ON sf.student_user_id = u.user_id
            WHERE ts.tutor_user_id = ?
            ORDER BY sf.created_at DESC
        `;

        const [feedbacks] = await db.query(query, [tutor_id]);
        res.json({ success: true, data: feedbacks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

module.exports = { createFeedback, getTutorFeedbacks };
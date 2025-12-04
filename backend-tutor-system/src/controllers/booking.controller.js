const db = require('../config/db');

// 1. ĐẶT LỊCH (Student)
const createBooking = async (req, res) => {
    // Lấy connection riêng để dùng Transaction
    const connection = await db.getConnection();
    try {
        const studentId = req.user.id; // Lấy từ token
        const role = req.user.role;
        const { slot_id, note } = req.body;

        // Chỉ sinh viên mới được đặt
        if (role !== 'student') {
            return res.status(403).json({ success: false, message: 'Chỉ sinh viên mới được đặt lịch.' });
        }

        if (!slot_id) {
            return res.status(400).json({ success: false, message: 'Vui lòng chọn lịch học.' });
        }

        // Bắt đầu giao dịch
        await connection.beginTransaction();

        // B1: Kiểm tra Slot có tồn tại và chưa ai đặt không?
        // Dùng 'FOR UPDATE' để khóa dòng này lại, tránh 2 người đặt cùng lúc
        const [slots] = await connection.query(
            'SELECT * FROM tutor_slots WHERE slot_id = ? AND is_booked = 0 FOR UPDATE',
            [slot_id]
        );

        if (slots.length === 0) {
            await connection.rollback();
            return res.status(400).json({ success: false, message: 'Lịch này không tồn tại hoặc đã có người đặt trước.' });
        }

        // B2: Tạo Booking mới
        await connection.query(
            `INSERT INTO bookings (student_user_id, tutor_slot_id, status, notes)
             VALUES (?, ?, 'pending', ?)`, // Trạng thái ban đầu là 'pending' (chờ xác nhận)
            [studentId, slot_id, note || '']
        );

        // B3: Cập nhật trạng thái Slot thành "Đã đặt"
        await connection.query(
            'UPDATE tutor_slots SET is_booked = 1 WHERE slot_id = ?',
            [slot_id]
        );

        // Lưu thay đổi
        await connection.commit();
        res.status(201).json({ success: true, message: 'Đặt lịch thành công!' });

    } catch (error) {
        await connection.rollback(); // Hoàn tác nếu lỗi
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    } finally {
        connection.release(); // Trả kết nối về hồ
    }
};

// 2. XEM DANH SÁCH LỊCH (Dùng chung cho cả Tutor và Student)
const getBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        let query = '';
        const params = [userId];

        if (role === 'student') {
            // Sinh viên: Xem lịch mình đã đặt + Thông tin Tutor
            query = `
                SELECT 
                    b.booking_id, b.status, b.notes, b.created_at,
                    ts.start_time, ts.end_time, ts.slot_type, ts.location,
                    u.full_name as tutor_name, u.email as tutor_email, u.phone_num as tutor_phone
                FROM bookings b
                JOIN tutor_slots ts ON b.tutor_slot_id = ts.slot_id
                JOIN users u ON ts.tutor_user_id = u.user_id
                WHERE b.student_user_id = ?
                ORDER BY ts.start_time DESC
            `;
        } else if (role === 'tutor') {
            // Tutor: Xem lịch sinh viên đặt mình + Thông tin Sinh viên
            query = `
                SELECT 
                    b.booking_id, b.status, b.notes, b.created_at,
                    ts.start_time, ts.end_time, ts.slot_type, ts.location,
                    u.full_name as student_name, u.email as student_email, u.phone_num as student_phone
                FROM bookings b
                JOIN tutor_slots ts ON b.tutor_slot_id = ts.slot_id
                JOIN users u ON b.student_user_id = u.user_id
                WHERE ts.tutor_user_id = ?
                ORDER BY ts.start_time DESC
            `;
        }

        const [bookings] = await db.query(query, params);
        res.json({ success: true, data: bookings });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

module.exports = { createBooking, getBookings };
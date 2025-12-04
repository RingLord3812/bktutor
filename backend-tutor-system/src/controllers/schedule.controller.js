const db = require('../config/db');

// 1. Tutor tạo lịch rảnh (Create Slots)
const createSlot = async (req, res) => {
    try {
        const tutorId = req.user.id;
        const role = req.user.role;

        // Kiểm tra quyền
        if (role !== 'tutor') {
            return res.status(403).json({ success: false, message: 'Chỉ Tutor mới được tạo lịch' });
        }

        const { start_time, end_time, slot_type, location, subject_id } = req.body;

        // Validate thời gian
        if (new Date(start_time) >= new Date(end_time)) {
            return res.status(400).json({ success: false, message: 'Thời gian kết thúc phải sau thời gian bắt đầu' });
        }

        // Insert vào bảng tutor_slots
        const [result] = await db.query(
            `INSERT INTO tutor_slots (tutor_user_id, subject_id, start_time, end_time, slot_type, location) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [tutorId, subject_id || null, start_time, end_time, slot_type || 'Online', location]
        );

        res.status(201).json({ 
            success: true, 
            message: 'Tạo lịch thành công', 
            slotId: result.insertId 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// 2. Lấy danh sách Slot (Student xem)
const getSlots = async (req, res) => {
    try {
        const { tutor_id } = req.query;

        let query = `SELECT * FROM tutor_slots WHERE is_booked = 0 AND start_time > NOW()`;
        const params = [];

        if (tutor_id) {
            query += ` AND tutor_user_id = ?`;
            params.push(tutor_id);
        }

        query += ` ORDER BY start_time ASC`;

        const [slots] = await db.query(query, params);

        res.json({ success: true, data: slots });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

module.exports = { createSlot, getSlots };
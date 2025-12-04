const db = require('../config/db');

// GET /api/users/me
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ middleware
        const role = req.user.role;

        // 1. Lấy thông tin cơ bản từ bảng users [cite: 1231]
        const [users] = await db.query('SELECT user_id, username, email, full_name, phone_num FROM users WHERE user_id = ?', [userId]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        
        const userInfo = users[0];
        let profileInfo = null;

        // 2. Lấy thông tin chi tiết tùy theo Role
        if (role === 'student') {
            // [cite: 1243] Student profile: class_name, gpa
            const [profiles] = await db.query('SELECT class_name, gpa FROM student_profiles WHERE user_id = ?', [userId]);
            profileInfo = profiles[0];
        } else if (role === 'tutor') {
            // [cite: 1247] Tutor profile: is_faculty, position, specialty, gpa
            const [profiles] = await db.query('SELECT is_faculty, position, specialty, gpa FROM tutor_profiles WHERE user_id = ?', [userId]);
            profileInfo = profiles[0];
        }

        // 3. Trả về kết quả gộp
        res.json({
            success: true,
            data: {
                ...userInfo,
                role,
                profile: profileInfo || {} // Trả về rỗng nếu chưa có profile
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// PUT /api/users/profile (Cập nhật hồ sơ)
const updateProfile = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const userId = req.user.id;
        const role = req.user.role;
        // Lấy các trường có thể update
        const { full_name, phone_num, class_name, gpa, specialty, position } = req.body;

        await connection.beginTransaction();

        // 1. Cập nhật bảng Users (chung)
        if (full_name || phone_num) {
            await connection.query(
                'UPDATE users SET full_name = COALESCE(?, full_name), phone_num = COALESCE(?, phone_num) WHERE user_id = ?',
                [full_name, phone_num, userId]
            );
        }

        // 2. Cập nhật bảng Profile riêng biệt
        if (role === 'student') {
            // Dùng cú pháp ON DUPLICATE KEY UPDATE để vừa Insert vừa Update
            await connection.query(
                `INSERT INTO student_profiles (user_id, class_name, gpa) VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE class_name = VALUES(class_name), gpa = VALUES(gpa)`,
                [userId, class_name, gpa]
            );
        } else if (role === 'tutor') {
            await connection.query(
                `INSERT INTO tutor_profiles (user_id, specialty, position, gpa) VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE specialty = VALUES(specialty), position = VALUES(position), gpa = VALUES(gpa)`,
                [userId, specialty, position, gpa]
            );
        }

        await connection.commit();
        res.json({ success: true, message: 'Cập nhật hồ sơ thành công!' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi cập nhật hồ sơ' });
    } finally {
        connection.release();
    }
};

module.exports = { getProfile, updateProfile };
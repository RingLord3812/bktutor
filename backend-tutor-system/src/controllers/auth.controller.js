const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Tạo ID ngẫu nhiên

// 1. ĐĂNG KÝ
const register = async (req, res) => {
    try {
        // Lấy dữ liệu từ Frontend gửi lên
        const { username, email, password, full_name, role_name } = req.body;

        // Validate cơ bản
        if (!username || !email || !password || !full_name || !role_name) {
            return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
        }

        // Kiểm tra role hợp lệ (chỉ cho phép student hoặc tutor)
        if (!['student', 'tutor'].includes(role_name)) {
            return res.status(400).json({ success: false, message: 'Role không hợp lệ (chỉ chọn student hoặc tutor)' });
        }

        // Tạo ID ngẫu nhiên (UUID)
        const userId = uuidv4();

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Gọi Stored Procedure trong MySQL
        // Thứ tự tham số: p_user_id, p_username, p_email, p_password, p_full_name, p_role_name
        await db.query(
            'CALL sp_RegisterUser(?, ?, ?, ?, ?, ?)',
            [userId, username, email, hashedPassword, full_name, role_name]
        );

        res.status(201).json({ success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập.' });

    } catch (error) {
        console.error('Lỗi Register:', error);
        
        // Bắt lỗi từ SQL (Signal 45000)
        if (error.sqlState === '45000') {
            return res.status(400).json({ success: false, message: error.message });
        }
        
        // Lỗi trùng lặp (nếu SP không bắt được)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Username hoặc Email đã tồn tại' });
        }

        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};

// 2. ĐĂNG NHẬP
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
        }

        // Gọi SP lấy thông tin user theo email
        const [rows] = await db.query('CALL sp_LoginUser(?)', [email]);
        
        // Kết quả trả về của CALL là một mảng: [ [user_row], data_packet ]
        const user = rows[0][0]; 

        if (!user) {
            return res.status(401).json({ success: false, message: 'Email không tồn tại' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Mật khẩu không đúng' });
        }

        // Tạo Token (Lưu user_id và role)
        const token = jwt.sign(
            { id: user.user_id, role: user.role_name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token hết hạn sau 1 ngày
        );

        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user.user_id,
                name: user.full_name,
                email: user.username, // Hoặc trả về email
                role: user.role_name
            }
        });

    } catch (error) {
        console.error('Lỗi Login:', error);
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};

module.exports = { register, login };
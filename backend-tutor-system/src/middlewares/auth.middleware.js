const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    // 1. Lấy token từ header (Authorization: Bearer <token>)
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Không tìm thấy Token, vui lòng đăng nhập!' });
    }

    try {
        // 2. Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Gán thông tin user vào request để các hàm sau dùng
        req.user = decoded; 
        // decoded chứa: { id: 'uuid...', role: 'student', iat: ..., exp: ... }

        next(); // Cho phép đi tiếp
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

// Middleware kiểm tra quyền (Optional: dùng sau này)
const isTutor = (req, res, next) => {
    if (req.user.role !== 'tutor') {
        return res.status(403).json({ success: false, message: 'Chức năng chỉ dành cho Tutor' });
    }
    next();
};

module.exports = { verifyToken, isTutor };
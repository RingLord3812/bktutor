const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Cấu hình Multer (Nơi lưu & Tên file)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        // Tạo thư mục nếu chưa có
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Đặt tên file: timestamp-ten-file-goc
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Bộ lọc file (Chỉ cho phép ảnh và PDF/Doc)
const fileFilter = (req, file, cb) => {
    // Chấp nhận mọi file hoặc lọc theo type tùy bạn. Ở đây mình mở rộng cho dễ test.
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// 2. API Upload Tài liệu (Tutor)
const uploadMaterial = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const tutorId = req.user.id;
        const role = req.user.role;
        
        if (role !== 'tutor') {
            return res.status(403).json({ message: 'Chỉ Tutor được quyền đăng tài liệu' });
        }

        // Multer đã xử lý file và gán vào req.file
        const file = req.file;
        const { subject_id, description } = req.body;

        if (!file) {
            return res.status(400).json({ message: 'Vui lòng chọn file để upload' });
        }
        if (!subject_id) {
            return res.status(400).json({ message: 'Vui lòng chọn môn học' });
        }

        // Tạo đường dẫn URL để frontend truy cập (VD: http://localhost:3000/uploads/filename.pdf)
        // Lưu ý: Bạn cần cấu hình static folder trong index.js
        const fileUrl = `/uploads/${file.filename}`;

        // Lưu vào Database
        await connection.query(
            `INSERT INTO materials (tutor_user_id, subject_id, file_name, file_url, description) 
             VALUES (?, ?, ?, ?, ?)`,
            [tutorId, subject_id, file.originalname, fileUrl, description || '']
        );

        res.status(201).json({ success: true, message: 'Tải tài liệu thành công', data: { fileUrl } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    } finally {
        connection.release();
    }
};

// 3. API Lấy danh sách tài liệu (Theo Subject ID)
const getMaterials = async (req, res) => {
    try {
        const { subject_id } = req.query;
        
        if (!subject_id) {
            return res.status(400).json({ message: 'Thiếu subject_id' });
        }

        const query = `
            SELECT m.*, u.full_name as tutor_name 
            FROM materials m
            JOIN users u ON m.tutor_user_id = u.user_id
            WHERE m.subject_id = ?
            ORDER BY m.uploaded_at DESC
        `;

        const [materials] = await db.query(query, [subject_id]);

        res.json({ success: true, data: materials });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

module.exports = { 
    uploadMiddleware: upload.single('file'), // Middleware xử lý 1 file có field name là 'file'
    uploadMaterial, 
    getMaterials 
};
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Tạo pool kết nối (tối ưu hơn tạo connection đơn lẻ)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Đảm bảo biến này khớp .env
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // 👇 THÊM DÒNG NÀY ĐỂ KẾT NỐI AZURE
    ssl: {
        rejectUnauthorized: false
    }
});

// Chuyển sang promise để dùng async/await
const promisePool = pool.promise();

console.log('Connected to MySQL Database!');

module.exports = promisePool;
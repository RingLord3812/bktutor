// client/src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Địa chỉ Backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động thêm Token vào mọi request nếu đã đăng nhập
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
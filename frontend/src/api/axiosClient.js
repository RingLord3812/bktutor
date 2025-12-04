// src/api/axiosClient.js
import axios from 'axios';
import { API_URL, ACCESS_TOKEN } from '../utils/constants';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Interceptor Request: Gắn Token vào Header nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Interceptor Response: Xử lý kết quả trả về
axiosClient.interceptors.response.use(
  (response) => response.data, // Trả về data trực tiếp, bỏ qua wrapper của axios
  (error) => {
    // Nếu lỗi 401 (Hết hạn token), có thể xử lý logout tự động ở đây
    if (error.response?.status === 401) {
        // console.warn('Token hết hạn hoặc không hợp lệ');
        // localStorage.clear();
        // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
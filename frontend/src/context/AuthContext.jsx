// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ACCESS_TOKEN, USER_INFO } from '../utils/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Trạng thái load lần đầu

  // Khi F5 trang web, đọc lại dữ liệu từ LocalStorage để không bị logout
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const storedUser = localStorage.getItem(USER_INFO);
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Lỗi parse user info:", e);
        // Nếu dữ liệu lỗi, xóa sạch để tránh bug
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USER_INFO);
      }
    }
    setLoading(false);
  }, []);

  // Hàm Đăng nhập
  const login = (token, userData) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(USER_INFO, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Hàm Đăng xuất
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_INFO);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook để dùng nhanh ở các component khác
export const useAuth = () => useContext(AuthContext);
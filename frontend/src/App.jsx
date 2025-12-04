import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

// Pages (Import trực tiếp hoặc Lazy đều được, ở đây import trực tiếp cho chắc ăn)
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import StudentHomePage from './pages/Student/StudentHomePage';
import StudentProfile from './pages/Student/StudentProfile';
import SellerRegister from './pages/SellerRegister/SellerRegister'; // Nhớ tạo file này nếu chưa có

// Protected Route Wrapper (Nếu bạn đã tách file này ra)
import ProtectedRoute from './routes/ProtectedRoute'; 

function App() {
  return (
    <>
      <Routes>
        {/* --- AUTH ROUTES --- */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/seller/register" element={<SellerRegister />} />

        {/* --- MAIN ROUTES (CÓ SIDEBAR & HEADER) --- */}
        <Route element={<MainLayout />}>
          
          {/* Trang chủ (Ai cũng xem được) */}
          <Route path="/" element={<StudentHomePage />} />
          
          {/* Route cần đăng nhập */}
          <Route element={<ProtectedRoute />}>
             <Route path="/student/profile" element={<StudentProfile />} />
             {/* Thêm các route khác ở đây */}
          </Route>

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
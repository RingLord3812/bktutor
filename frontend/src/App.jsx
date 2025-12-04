import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import TutorHomePage from './pages/TutorHomePage';
import StudentProfilePage from './pages/StudentProfilePage';
import ChatPage from './pages/ChatPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';

// --- Local Components for Dashboard (Legacy) ---
const CourseCard = ({ course }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 p-5 h-[200px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
      {/* Layer 1: Top Badges */}
      <div className="flex justify-between items-start">
        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {course.subject}
        </span>
        <span className="border border-white/30 text-white px-3 py-1 rounded-full text-xs">
          {course.capacity}
        </span>
      </div>

      {/* Layer 2: Info Center */}
      <div>
        <h3 className="text-white font-bold text-xl mb-1">{course.title}</h3>
        <div className="space-y-0.5">
          <p className="text-white text-sm opacity-90">Tutor: {course.tutor}</p>
          <p className="text-white text-sm opacity-90">Sinh viên: {course.students}</p>
        </div>
      </div>

      {/* Layer 3: Footer Action */}
      <div className="flex justify-between items-end">
        <span className="text-blue-100 text-xs">Cập nhật mới nhất</span>
        <button className="bg-white text-blue-700 font-semibold text-sm rounded-lg px-4 py-2 hover:scale-105 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm">
          Đăng ký
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

const Dashboard = () => {
  const courses = [
    { id: 1, subject: "CNPM", capacity: "45 sv", title: "Công nghệ Phần mềm", tutor: "Nguyễn Văn A", students: 120 },
    { id: 2, subject: "MMT", capacity: "30 sv", title: "Mạng Máy Tính", tutor: "Trần Thị B", students: 85 },
    { id: 3, subject: "CSDL", capacity: "50 sv", title: "Cơ Sở Dữ Liệu", tutor: "Lê Văn C", students: 150 },
    { id: 4, subject: "CTDL", capacity: "40 sv", title: "Cấu Trúc Dữ Liệu", tutor: "Phạm Thị D", students: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      {/* Main Container */}
      <div className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        {/* Content Body */}
        <main className="flex-1 p-8 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Khóa học có thể đăng ký</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-home" element={<Dashboard />} />
      <Route path="/tutor-home" element={<TutorHomePage />} />
      <Route path="/profile" element={<StudentProfilePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/course/:id" element={<CourseDetailPage />} />
      <Route path="/course/:id/lesson" element={<LessonPage />} />
    </Routes>
  );
}
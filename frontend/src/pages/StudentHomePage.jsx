// client/src/pages/StudentHomePage.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';

const StudentHomePage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSlots = async () => {
    try {
      const response = await axiosClient.get('/schedule/slots');
      setSlots(response.data.data);
    } catch (err) {
      console.error("Lỗi:", err);
      setError('Không thể tải danh sách lớp học.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleBooking = async (slotId) => {
    if (!window.confirm('Bạn có chắc muốn đăng ký lớp này không?')) return;

    try {
      await axiosClient.post('/schedule/bookings', {
        tutor_slot_id: slotId
      });
      alert('✅ Đăng ký thành công!');
      fetchSlots();
    } catch (err) {
      alert('❌ Đăng ký thất bại: ' + (err.response?.data?.message || 'Lỗi server'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Khóa học có thể đăng ký</h1>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded-r shadow-sm" role="alert">
                <p className="font-medium">Lỗi!</p>
                <p>{error}</p>
              </div>
            ) : slots.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-gray-300 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">Hiện chưa có khóa học nào để đăng ký.</p>
                <p className="text-gray-400 text-sm mt-2">Vui lòng quay lại sau.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {slots.map((slot) => (
                  <CourseCard 
                    key={slot.slot_id} 
                    slot={slot} 
                    onRegister={handleBooking} 
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentHomePage;
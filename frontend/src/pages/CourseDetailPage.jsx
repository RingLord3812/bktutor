import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send as SendIcon, KeyboardArrowRight } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { coursesData } from '../data/mockCourses';

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = coursesData.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex">
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-8 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-500">Không tìm thấy khóa học</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      {/* Main Container */}
      <div className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex flex-col gap-6">
            
            {/* Section 1: Header Môn Học */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex justify-between items-center">
              {/* Left Side */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{course.title}</h1>
                <p className="text-blue-600 font-medium mb-2">Tutor: {course.tutor}</p>
                <div className="flex gap-4 text-xs text-gray-400">
                  {course.meta.split(' - ').map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                <span>Đánh Giá</span>
                <SendIcon fontSize="small" className="transform -rotate-45 mb-1" />
              </button>
            </div>

            {/* Section 2: Bài giảng môn học */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bài giảng môn học</h2>
              <div className="flex flex-col gap-4">
                {course.lectures.map((lecture) => (
                  <div key={lecture.id} className="bg-blue-600 rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                    {/* Content */}
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{lecture.title}</h3>
                      <p className="text-sm opacity-90">Tutor: {lecture.tutor}</p>
                      <p className="text-xs opacity-90 mt-1">Tiến độ: {lecture.progress}%</p>
                    </div>
                    
                    {/* Action */}
                    <Link to={`/course/${id}/lesson`} className="bg-white text-blue-600 font-semibold rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                      Vào học
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Bài kiểm tra định kỳ */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bài kiểm tra định kỳ</h2>
              <div className="flex flex-col gap-4">
                {course.exams.map((exam) => (
                  <div key={exam.id} className="bg-blue-600 rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                    {/* Content */}
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{exam.title}</h3>
                      <p className="text-sm opacity-90">Thời gian: {exam.duration}</p>
                      <p className="text-xs opacity-90 mt-1">{exam.remaining}</p>
                    </div>
                    
                    {/* Action */}
                    <button className="bg-white text-blue-600 font-semibold rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                      Bắt đầu
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Hỗ trợ (Re-used) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">HỖ TRỢ</h3>
              <div className="flex flex-col">
                {[
                  { label: 'Liên hệ Tổ kỹ thuật' },
                  { label: 'Góp ý, Báo lỗi' },
                  { label: 'FAQ Hướng dẫn' }
                ].map((item, index, arr) => (
                  <div 
                    key={index} 
                    className={`flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg ${
                      index !== arr.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-gray-800 font-medium">{item.label}</span>
                    <KeyboardArrowRight className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetailPage;

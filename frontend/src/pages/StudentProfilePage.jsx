import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StudentProfilePage = () => {
  const currentCourses = [
    { id: 'cong-nghe-phan-mem', code: 'CNPM', name: 'Công nghệ Phần mềm', tutor: 'UIA', progress: 80 },
    { id: 'mang-may-tinh', code: 'MMT', name: 'Mạng Máy Tính', tutor: 'Ew', progress: 65 },
    { id: 'he-co-so-du-lieu', code: 'CSDL', name: 'Hệ cơ sở dữ liệu', tutor: 'O^i', progress: 40 },
    { id: 'do-an-cnpm', code: 'ĐA', name: 'Đồ án tổng hợp - CNPM', tutor: 'Á', progress: 90 },
    { id: 'hoa-dai-cuong', code: 'HĐC', name: 'Hóa đại cương', tutor: 'Bùm bùm', progress: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      {/* Main Container */}
      <div className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex flex-col gap-6">
            
            {/* Section 1: Personal Info Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
                <span className="text-white text-3xl font-bold">NQ</span>
              </div>
              
              {/* Info Text */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Nguyễn Thị Tội</h2>
                <p className="text-gray-500 mb-2">Kỹ sư kỹ thị</p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <span>MSSV: 36</span>
                  <span className="border-l border-gray-300 pl-6">Email: anh36@hcmut.edu.vn</span>
                  <span className="border-l border-gray-300 pl-6">Khóa: 2020</span>
                </div>
              </div>
            </div>

            {/* Section 2: Course List */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Môn đang học trong kỳ 231</h3>
                <p className="text-sm text-gray-500">Gồm có {currentCourses.length} môn</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCourses.map((course) => (
                  <div key={course.id} className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-5 text-white flex flex-col justify-between h-[180px] shadow-md hover:shadow-lg transition-shadow">
                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium">
                        {course.code}
                      </span>
                      <span className="border border-white/30 px-2 py-1 rounded text-xs">
                        {course.progress}% hoàn thành
                      </span>
                    </div>

                    {/* Middle Row */}
                    <div>
                      <h4 className="text-lg font-bold mb-1">{course.name}</h4>
                      <div className="text-sm opacity-90">Tutor: {course.tutor}</div>
                      <div className="text-xs opacity-80 mt-1">Tiến độ: {course.progress}%</div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-70">Cập nhật mới nhất</span>
                      <Link to={`/course/${course.id}`} className="bg-white text-blue-700 font-semibold text-sm rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
                        Vào học
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Support */}
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

export default StudentProfilePage;

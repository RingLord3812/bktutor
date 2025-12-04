import React, { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard/CourseCard'; // Cần tạo/copy file này
// import api from '../../services/api'; // Service gọi API

const StudentHomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // TODO: Gọi API lấy danh sách khóa học từ Backend
    // api.getCourses().then(data => setCourses(data));

    // Tạm thời dùng Mock Data để test UI
    setCourses([
      { 
        _id: 1, 
        tutor_user_id: 'TutorA', 
        start_time: new Date().toISOString(),
        location: 'Online',
        slot_type: 'Online'
      },
      { 
        _id: 2, 
        tutor_user_id: 'TutorB', 
        start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        location: 'H6-102',
        slot_type: 'Offline'
      },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Khóa học có thể đăng ký</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course._id} slot={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentHomePage;
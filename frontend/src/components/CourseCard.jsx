import React from 'react';

const CourseCard = ({ slot, onRegister }) => {
  // Extract data with fallbacks
  const subjectName = slot.subject?.name || 'Môn học chưa đặt tên';
  const subjectCode = slot.subject?.code || 'MH';
  const tutorName = slot.tutor?.user?.full_name || 'Chưa cập nhật';
  const currentStudents = slot.current_students || 0;
  const maxStudents = slot.max_students || 45;
  const startTime = slot.start_time ? new Date(slot.start_time).toLocaleString('vi-VN', {
    weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : 'Chưa có lịch';

  return (
    <div className="group bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex flex-col justify-between h-full min-h-[220px] relative overflow-hidden">
      
      {/* Decorative background circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>

      {/* Top Row */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md border border-white/10 shadow-sm">
          {subjectCode}
        </span>
        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
          {currentStudents} / {maxStudents} sv
        </span>
      </div>

      {/* Middle Row */}
      <div className="mb-6 relative z-10">
        <h3 className="text-2xl font-bold mb-3 leading-tight line-clamp-2" title={subjectName}>
          {subjectName}
        </h3>
        <div className="space-y-1.5 opacity-90 text-sm">
          <p className="flex items-center gap-2">
            <span className="opacity-70">Tutor:</span> 
            <span className="font-semibold bg-white/10 px-2 py-0.5 rounded">{tutorName}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="opacity-70">Lịch:</span> 
            <span>{startTime}</span>
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10 relative z-10">
        <span className="text-xs opacity-75 font-medium">Cập nhật mới nhất</span>
        <button
          onClick={() => onRegister(slot.slot_id)}
          className="bg-white text-blue-700 px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

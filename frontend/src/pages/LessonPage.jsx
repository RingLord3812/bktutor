import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { PlayArrow, CheckCircle } from '@mui/icons-material';

const lessonData = {
  // 1. Hóa đại cương
  "hoa-dai-cuong": {
    lessonTitle: "Chương 1 : Oxy",
    subHeader: "I. Làm quen với oxygen",
    tutor: "UIA",
    progress: "80%",
    videoTitle: "Giới thiệu về nguyên tố Oxy",
    questions: [
      {
        id: 1,
        question: "Trong phản ứng cháy, Oxy đóng vai trò là chất gì?",
        options: [
          { id: "A", text: "Chất khử" },
          { id: "B", text: "Chất oxi hóa" }, // Đúng
          { id: "C", text: "Chất xúc tác" }
        ]
      },
      {
        id: 2,
        question: "Công thức hóa học của Ozone là gì?",
        options: [
          { id: "A", text: "O2" },
          { id: "B", text: "O3" }, // Đúng
          { id: "C", text: "O4" }
        ]
      }
    ]
  },

  // 2. Hệ cơ sở dữ liệu
  "he-co-so-du-lieu": {
    lessonTitle: "Chương 2 : SQL Cơ bản",
    subHeader: "II. Truy vấn dữ liệu với SELECT",
    tutor: "O^i",
    progress: "45%",
    videoTitle: "Hướng dẫn câu lệnh SELECT - FROM - WHERE",
    questions: [
      {
        id: 1,
        question: "Để lấy tất cả các cột từ bảng 'SinhVien', ta dùng lệnh nào?",
        options: [
          { id: "A", text: "SELECT all FROM SinhVien" },
          { id: "B", text: "SELECT * FROM SinhVien" }, // Đúng
          { id: "C", text: "GET SinhVien" }
        ]
      },
      {
        id: 2,
        question: "Mệnh đề WHERE được dùng để làm gì?",
        options: [
          { id: "A", text: "Sắp xếp dữ liệu" },
          { id: "B", text: "Lọc dữ liệu theo điều kiện" }, // Đúng
          { id: "C", text: "Nhóm dữ liệu" }
        ]
      }
    ]
  },

  // 3. Công nghệ phần mềm
  "cong-nghe-phan-mem": {
    lessonTitle: "Chương 2 : Mô hình Agile",
    subHeader: "I. Giới thiệu về Scrum Framework",
    tutor: "UIA",
    progress: "60%",
    videoTitle: "Quy trình Scrum: Sprint, Backlog, Daily Standup",
    questions: [
      {
        id: 1,
        question: "Độ dài lý tưởng của một Sprint là bao lâu?",
        options: [
          { id: "A", text: "1 - 4 tuần" }, // Đúng
          { id: "B", text: "3 tháng" },
          { id: "C", text: "1 ngày" }
        ]
      },
      {
        id: 2,
        question: "Ai là người chịu trách nhiệm quản lý Product Backlog?",
        options: [
          { id: "A", text: "Scrum Master" },
          { id: "B", text: "Product Owner" }, // Đúng
          { id: "C", text: "Development Team" }
        ]
      }
    ]
  },

  // 4. Mạng máy tính
  "mang-may-tinh": {
    lessonTitle: "Chương 3 : Địa chỉ IP",
    subHeader: "III. Phân chia mạng con (Subnetting)",
    tutor: "Ew",
    progress: "10%",
    videoTitle: "Cách tính Subnet Mask và Host ID",
    questions: [
      {
        id: 1,
        question: "Địa chỉ IP 192.168.1.1 thuộc lớp mạng nào?",
        options: [
          { id: "A", text: "Lớp A" },
          { id: "B", text: "Lớp B" },
          { id: "C", text: "Lớp C" } // Đúng
        ]
      },
      {
        id: 2,
        question: "IPv4 có độ dài bao nhiêu bit?",
        options: [
          { id: "A", text: "32 bit" }, // Đúng
          { id: "B", text: "64 bit" },
          { id: "C", text: "128 bit" }
        ]
      }
    ]
  },

  // 5. Đồ án tổng hợp
  "do-an-cnpm": {
    lessonTitle: "Giai đoạn 1 : Đề xuất đề tài",
    subHeader: "Hướng dẫn viết Proposal",
    tutor: "Á",
    progress: "100%",
    videoTitle: "Cách trình bày mục tiêu và phạm vi đề tài",
    questions: [
      {
        id: 1,
        question: "Phần nào quan trọng nhất trong bản đề xuất?",
        options: [
          { id: "A", text: "Công nghệ sử dụng" },
          { id: "B", text: "Tính cấp thiết và giải pháp" }, // Đúng
          { id: "C", text: "Giao diện đẹp" }
        ]
      },
      {
        id: 2,
        question: "Deadline nộp bản cứng là khi nào?",
        options: [
          { id: "A", text: "Tuần 5" },
          { id: "B", text: "Tuần 8" },
          { id: "C", text: "Trước khi bảo vệ" } // Tùy context
        ]
      }
    ]
  }
};

const LessonPage = () => {
  const { id } = useParams();
  const data = lessonData[id];
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex">
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col">
          <Header />
          <div className="p-8 text-center text-gray-500">
            Không tìm thấy bài học cho khóa học này.
          </div>
        </div>
      </div>
    );
  }

  const handleOptionClick = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <Sidebar />
      
      {/* Main Container */}
      <div className="ml-64 flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-8 bg-gray-50">
          {/* Course Info Card (Simplified version based on request) */}
          <div className="mb-6">
             <h1 className="text-2xl font-bold text-gray-900">Chi tiết bài học</h1>
          </div>

          {/* Lesson Banner */}
          <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg mb-6">
            <h2 className="text-3xl font-bold mb-2">{data.lessonTitle}</h2>
            <div className="flex items-center gap-4 text-blue-100 text-sm">
              <span>Tutor: {data.tutor}</span>
              <span>|</span>
              <span>Tiến độ: {data.progress}</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            
            {/* Heading Section */}
            <h3 className="text-xl font-bold text-gray-900 underline decoration-2 decoration-blue-500 underline-offset-4 mb-6">
              {data.subHeader}
            </h3>

            {/* Video Player Component */}
            <div 
              className="w-full aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center cursor-pointer group relative overflow-hidden shadow-inner"
              onClick={() => setIsPlaying(true)}
            >
              {!isPlaying ? (
                <div className="flex flex-col items-center text-white transition-transform group-hover:scale-110">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/30">
                    <PlayArrow style={{ fontSize: 60 }} />
                  </div>
                  <span className="font-medium text-lg">{data.videoTitle}</span>
                </div>
              ) : (
                <div className="text-white text-center animate-pulse">
                  <p className="text-2xl font-bold">Playing Video...</p>
                  <p className="text-sm opacity-80">{data.videoTitle}</p>
                </div>
              )}
            </div>

            {/* Quiz Section */}
            <div className="mt-12 grid gap-6">
              {data.questions.map((q) => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Dựa vào kiến thức đã học trả lời câu hỏi sau:
                  </h4>
                  <p className="text-gray-700 mb-4 font-medium">{q.question}</p>
                  
                  <div className="flex flex-col gap-3">
                    {q.options.map((opt) => {
                      const isSelected = selectedAnswers[q.id] === opt.id;
                      return (
                        <div 
                          key={opt.id}
                          onClick={() => handleOptionClick(q.id, opt.id)}
                          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                          <div 
                            className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm transition-colors ${isSelected ? 'bg-orange-500' : 'bg-blue-500'}`}
                          >
                            {opt.id}
                          </div>
                          <span className={`text-sm ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                            {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonPage;

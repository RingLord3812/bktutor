import React from 'react';
import { Star, ChatBubble, Description } from '@mui/icons-material';

const NotificationDropdown = () => {
  const notifications = [
    {
      id: 1,
      type: 'star',
      user: 'Tiểu Mỹ',
      action: 'đã phát hành bài kiểm tra mới -',
      target: 'TB01 Kỹ năng sống',
      time: '5 mins ago',
      isRead: true,
    },
    {
      id: 2,
      type: 'chat',
      user: 'Kevin',
      action: 'đã đánh giá bài tập của bạn -',
      target: 'TB02 Tiếng Nga',
      time: 'Just now',
      isRead: false,
    },
    {
      id: 3,
      type: 'file',
      user: '',
      title: 'BÀI KIỂM TRA SỐ 1 - TB02 Tiếng Nga',
      action: 'sắp hết hạn.',
      target: '',
      time: '6 mins ago',
      isRead: true,
    },
    {
      id: 4,
      type: 'file',
      user: '',
      title: 'Bài kiểm tra giữa kỳ - TB05 Đại số tuyến tính',
      action: 'sắp hết hạn.',
      target: '',
      time: '19 mins ago',
      isRead: true,
    },
    {
      id: 5,
      type: 'star',
      user: 'Tiểu Mỹ',
      action: 'đã phát hành bài kiểm tra mới -',
      target: 'TB01 Kỹ năng sống',
      time: '5 mins ago',
      isRead: true,
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'star': return <Star className="text-white" fontSize="small" />;
      case 'chat': return <ChatBubble className="text-white" fontSize="small" />;
      case 'file': return <Description className="text-white" fontSize="small" />;
      default: return <Star className="text-white" fontSize="small" />;
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Notification</h3>
        <span className="text-sm text-gray-500 cursor-pointer hover:text-blue-600">Mark as Read</span>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!item.isRead ? 'bg-blue-50/50' : ''}`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-1">
              {getIcon(item.type)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800 leading-snug">
                {item.user ? (
                  <>
                    <span className="font-bold">{item.user}</span> {item.action} <span className="font-bold">{item.target}</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold">{item.title}</span> {item.action}
                  </>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;

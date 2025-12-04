import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Notifications, ChatBubbleOutline, Book } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const navigate = useNavigate();
  
  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  const searchData = [
    { id: 'hoa-dai-cuong', title: 'Hóa đại cương' },
    { id: 'he-co-so-du-lieu', title: 'Hệ cơ sở dữ liệu' },
    { id: 'cong-nghe-phan-mem', title: 'Công nghệ Phần mềm' },
    { id: 'mang-may-tinh', title: 'Mạng máy tính' },
    { id: 'do-an-cnpm', title: 'Đồ án tổng hợp - CNPM' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setSearchResults([]);
      setShowSearchDropdown(false);
    } else {
      const filtered = searchData.filter(course => 
        course.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    }
  };

  const handleResultClick = (courseId) => {
    navigate(`/course/${courseId}`);
    setSearchTerm('');
    setShowSearchDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Left: Menu Icon */}
      <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Menu />
      </button>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowSearchDropdown(true)}
            className="block w-full pl-11 pr-4 py-2.5 border-none rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all shadow-sm"
            placeholder="Tìm kiếm khóa học, tutor..."
          />

          {/* Search Results Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((course) => (
                    <div 
                      key={course.id}
                      onClick={() => handleResultClick(course.id)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                        <Book fontSize="small" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover/item:text-blue-600 transition-colors">
                        {course.title}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  Không tìm thấy khóa học nào
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Wrapper */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all relative ${showNotifications ? 'bg-blue-50 text-blue-600' : ''}`}
          >
            <Notifications fontSize="small" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          {showNotifications && <NotificationDropdown />}
        </div>

        <Link to="/chat" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <ChatBubbleOutline fontSize="small" />
        </Link>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useRef, useEffect, useContext } from 'react';
import { Menu, Search, Notifications, ChatBubbleOutline } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AuthContext'; // Import Context

const Header = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AppContext); // Lấy profile để check role
  
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  // Logic link Seller
  const isSeller = profile?.roles?.includes('Seller');
  const sellerLink = isSeller ? '/seller/products' : '/seller/register';
  const sellerTitle = isSeller ? 'Kênh Người Bán' : 'Trở thành Người bán Shopee';

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchDropdown(value.trim() !== '');
  };

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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm w-full">
      
      {/* --- BÊN TRÁI: LINK KÊNH NGƯỜI BÁN --- */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg lg:hidden">
          <Menu />
        </button>
        
        {/* Link chuyển sang Seller */}
        <Link 
          to={sellerLink} 
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors hidden md:block"
        >
          {sellerTitle}
        </Link>
      </div>

      {/* --- GIỮA: SEARCH BAR --- */}
      <div className="flex-1 max-w-xl mx-4 lg:mx-8" ref={searchRef}>
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
          
          {/* Search Dropdown (Demo) */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden p-4 text-center text-sm text-gray-500">
               Tính năng tìm kiếm đang phát triển
            </div>
          )}
        </div>
      </div>

      {/* --- BÊN PHẢI: ACTIONS --- */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all relative ${showNotifications ? 'bg-blue-50 text-blue-600' : ''}`}
          >
            <Notifications fontSize="small" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>

        <Link to="/chat" className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <ChatBubbleOutline fontSize="small" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
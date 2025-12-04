import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Person, Lock, Badge, School } from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student' // student, tutor, admin
  });

  // Initialize Mock Database
  useEffect(() => {
    const existingUsers = localStorage.getItem('bk_tutor_users');
    if (!existingUsers) {
      const defaultUsers = [
        { username: 'admin', password: '123', fullName: 'Nguyễn Thị Tội', role: 'student', mssv: '36' },
        { username: 'student_test', password: '123', fullName: 'Lê Văn A', role: 'student', mssv: '20201234' },
        { username: 'tutor_test', password: '123', fullName: 'Trần Gia Sư', role: 'tutor', mssv: 'TUT001' }
      ];
      localStorage.setItem('bk_tutor_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error on typing
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // 1. Validate
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (!formData.username || !formData.password || !formData.fullName) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // 2. Check Exist
    const users = JSON.parse(localStorage.getItem('bk_tutor_users') || '[]');
    const userExists = users.some(u => u.username === formData.username);
    
    if (userExists) {
      setError('Tên đăng nhập đã tồn tại!');
      return;
    }

    // 3. Save
    const newUser = {
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role,
      mssv: formData.role === 'student' ? '2024' + Math.floor(Math.random() * 1000) : 'TUT' + Math.floor(Math.random() * 100)
    };

    users.push(newUser);
    localStorage.setItem('bk_tutor_users', JSON.stringify(users));

    // 4. Success & Switch
    setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
    setFormData({ ...formData, password: '', confirmPassword: '' });
    setTimeout(() => {
      setIsLoginMode(true);
      setSuccess('');
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('bk_tutor_users') || '[]');
    const user = users.find(u => u.username === formData.username && u.password === formData.password);

    if (user) {
      // Login Success
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('role', user.role); // For legacy compatibility if needed
      
      if (user.role === 'tutor') {
        navigate('/tutor-home');
      } else {
        navigate('/student-home');
      }
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header / Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setIsLoginMode(true)}
            className={`flex-1 py-4 text-center font-bold transition-colors ${isLoginMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Đăng nhập
          </button>
          <button 
            onClick={() => setIsLoginMode(false)}
            className={`flex-1 py-4 text-center font-bold transition-colors ${!isLoginMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Đăng ký
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Book fontSize="large" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">BK Tutor</h2>
            <p className="text-gray-500 text-sm mt-1">Hệ thống hỗ trợ học tập</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100 text-center">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="space-y-4">
            
            {!isLoginMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Person fontSize="small" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nhập họ tên hiển thị"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập / MSSV</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Badge fontSize="small" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Nhập MSSV hoặc username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock fontSize="small" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLoginMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock fontSize="small" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <School fontSize="small" />
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                    >
                      <option value="student">Sinh Viên</option>
                      <option value="tutor">Tutor</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mt-6"
            >
              {isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
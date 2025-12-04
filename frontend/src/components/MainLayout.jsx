// client/src/components/MainLayout.jsx
import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const MainLayout = () => {
  const navigate = useNavigate();
  // Lấy role từ localStorage để hiển thị "Xin chào..."
  const role = localStorage.getItem('role') === 'student' ? 'Sinh Viên' : 'Tutor';

  const handleLogout = () => {
    // Xóa token và quay về trang login
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 1. Header Trắng ở trên cùng */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'white', color: 'black', boxShadow: 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Hệ thống BK Tutor - Xin chào, {role}!
          </Typography>
          <Button color="error" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Đăng xuất
          </Button>
        </Toolbar>
      </AppBar>

      {/* 2. Sidebar Xanh bên trái */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#1976d2', // Màu xanh BK
            color: 'white'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">BK Tutor</Typography>
        </Toolbar>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Trang Chủ" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: 'white' }}><ClassIcon /></ListItemIcon>
            <ListItemText primary="Khóa học của tôi" />
          </ListItem>
        </List>
      </Drawer>

      {/* 3. Nội dung chính (Thay đổi linh hoạt) */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3, minHeight: '100vh' }}>
        <Toolbar /> {/* Khoảng trống để nội dung không bị Header che mất */}
        
        {/* Outlet chính là nơi các trang con (StudentHome, TutorHome) sẽ hiện ra */}
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default MainLayout;
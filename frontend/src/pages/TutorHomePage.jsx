// client/src/pages/TutorHomePage.jsx
import React, { useState } from 'react';
import { Box, Typography, Card, TextField, Button, Grid, Alert, Container } from '@mui/material';
import axiosClient from '../api/axiosClient';

const TutorHomePage = () => {
  // State cho form
  const [subjectId, setSubjectId] = useState(101); // Mặc định môn ID 101 (Kỹ thuật phần mềm)
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleCreateSlot = async () => {
    try {
      // 1. Validate (Kiểm tra dữ liệu)
      if (!startTime || !endTime) {
        setMessage({ type: 'error', text: 'Vui lòng chọn đầy đủ ngày giờ!' });
        return;
      }

      // 2. Gọi API tạo lịch (POST)
      // Lưu ý: input datetime-local trả về 'YYYY-MM-DDTHH:mm', ta cần thêm ':00' cho đúng chuẩn MySQL
      await axiosClient.post('/schedule/slots', {
        subject_id: subjectId,
        start_time: startTime + ':00', 
        end_time: endTime + ':00'
      });

      setMessage({ type: 'success', text: '✅ Đã mở lớp thành công! Sinh viên có thể đăng ký ngay.' });
      
      // Reset form
      setStartTime('');
      setEndTime('');

    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: '❌ Lỗi: ' + (error.response?.data?.message || 'Không thể tạo lịch') });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Quản lý lịch dạy
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Mở các khung giờ rảnh để sinh viên đăng ký học.
      </Typography>

      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={3} fontWeight="bold">Tạo lịch mới</Typography>
        
        {message.text && (
          <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              label="Môn học" 
              fullWidth 
              value="Kỹ thuật phần mềm (ID: 101)"
              disabled // Demo này ta hardcode môn 101 cho nhanh
              helperText="Trong bản Demo, hệ thống mặc định chọn môn này."
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Thời gian bắt đầu"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Thời gian kết thúc"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth 
              size="large" 
              onClick={handleCreateSlot}
              sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
            >
              Mở Lớp Ngay
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default TutorHomePage;
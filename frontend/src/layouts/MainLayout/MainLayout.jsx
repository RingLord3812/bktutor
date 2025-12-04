import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar'; // Cần tạo file này
import Header from '../../components/Header/Header';   // Cần tạo file này

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header cố định bên trên */}
        <Header />

        {/* Nội dung chính cuộn được */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
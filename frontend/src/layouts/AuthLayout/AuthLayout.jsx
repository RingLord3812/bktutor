import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-50 font-sans">
      
      {/* --- CỘT TRÁI: Intro (Ẩn trên mobile) --- */}
      <div className="hidden w-1/2 flex-col justify-between bg-white p-12 lg:flex border-r border-gray-100 relative">
        <div className="flex items-center gap-2 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">BK</div>
          <span className="text-2xl font-extrabold text-blue-900">BK Tutor</span>
        </div>
        <div className="z-10 mt-10 max-w-lg">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-500">Nền tảng học tập</p>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-slate-900">
            Kết nối <span className="text-blue-600">Tri thức</span> <br />
            Vươn tới thành công.
          </h1>
          <p className="text-lg text-slate-500">Hệ thống tìm kiếm gia sư và quản lý lớp học hàng đầu dành cho sinh viên Bách Khoa.</p>
        </div>
        <div className="text-xs font-medium text-gray-400 z-10">© 2025 BK Tutor Inc.</div>
        
        {/* Background Decor */}
        <div className="absolute top-1/2 right-[-100px] h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-50 blur-3xl opacity-50"></div>
      </div>

      {/* --- CỘT PHẢI: Form --- */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
           <div className="mb-8 text-center lg:hidden">
              <h2 className="text-3xl font-extrabold text-blue-900">BK Tutor</h2>
           </div>
           <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
              </div>
              {children}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
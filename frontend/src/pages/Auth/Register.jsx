import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../services/auth.service'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch("password")

  const registerMutation = useMutation({
    mutationFn: (body) => authApi.registerAccount(body),
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      navigate('/auth/login')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại')
    }
  })

  const onSubmit = (data) => {
    registerMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
      full_name: data.fullName,
      role_name: data.role // Backend cần 'role_name'
    })
  }

  return (
    <AuthLayout title="Tạo tài khoản mới" subtitle="Tham gia cộng đồng BK Tutor.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">Họ tên</label>
             <input type="text" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Nguyễn Văn A" {...register('fullName', { required: true })} />
           </div>
           <div>
             <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">Username</label>
             <input type="text" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="user123" {...register('username', { required: true })} />
           </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">Email</label>
          <input type="email" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="email@Example.com" {...register('email', { required: true })} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">Bạn là ai?</label>
          <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" {...register('role')}>
            <option value="student">👨‍🎓 Sinh viên</option>
            <option value="tutor">👩‍🏫 Gia sư (Tutor)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">Mật khẩu</label>
              <input type="password" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="••••••" {...register('password', { required: true, minLength: 6 })} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-700 uppercase">Nhập lại</label>
              <input type="password" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="••••••" {...register('confirmPassword', { validate: val => val === password || "Không khớp" })} />
            </div>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-500">Mật khẩu không khớp</p>}

        <button type="submit" disabled={registerMutation.isPending} className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 disabled:opacity-70">
          {registerMutation.isPending ? 'Đang tạo...' : 'Đăng Ký'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">Đã có tài khoản? <Link to="/auth/login" className="font-bold text-blue-600 hover:underline">Đăng nhập</Link></p>
      </div>
    </AuthLayout>
  )
}

export default Register
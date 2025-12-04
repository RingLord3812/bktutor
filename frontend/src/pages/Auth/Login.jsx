import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../services/auth.service'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const loginMutation = useMutation({
    mutationFn: (body) => authApi.login(body),
    onSuccess: (data) => {
      // data = { success: true, message, token, user: {...} }
      login(data.token, data.user)
      toast.success('Đăng nhập thành công! 🚀')
      
      // Điều hướng theo Role
      const role = data.user.role;
      if (role === 'tutor') navigate('/tutor/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/student/home');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại')
    }
  })

  const onSubmit = (data) => loginMutation.mutate(data)

  return (
    <AuthLayout title="Chào mừng trở lại!" subtitle="Đăng nhập để tiếp tục học tập.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            placeholder="name@example.com"
            {...register('email', { required: 'Vui lòng nhập Email' })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Mật khẩu</label>
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            placeholder="••••••••"
            {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="mt-2 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 disabled:opacity-70"
        >
          {loginMutation.isPending ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="font-bold text-blue-600 hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login
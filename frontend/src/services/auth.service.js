import axiosClient from '../api/axiosClient';

const authApi = {
  // Đăng ký tài khoản
  registerAccount(body) {
    // body: { username, email, password, full_name, role_name }
    return axiosClient.post('/auth/register', body)
  },

  // Đăng nhập
  login(body) {
    // body: { email, password }
    return axiosClient.post('/auth/login', body)
  },

  // Đăng xuất (nếu backend có api logout)
  logout() {
    // return axiosClient.post('/auth/logout')
    // Tạm thời xử lý ở client là chính
  }
}

export default authApi
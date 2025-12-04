// client/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- QUAN TRỌNG NHẤT
import App from './App.jsx'
import './index.css'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- BẮT BUỘC PHẢI CÓ CÁI NÀY */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
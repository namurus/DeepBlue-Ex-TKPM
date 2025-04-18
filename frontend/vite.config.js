import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Sử dụng các global test functions như describe, it
    environment: 'jsdom', // Thiết lập môi trường cho các test liên quan đến DOM
    setupFiles: './setupTests.js', // Đường dẫn đến file setup nếu cần thiết
  },
})

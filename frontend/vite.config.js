import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  test: {
    globals: true, // Sử dụng các global test functions như describe, it
    environment: 'jsdom', // Thiết lập môi trường cho các test liên quan đến DOM
    setupFiles: './test.setup.js', // Đường dẫn đến file setup nếu cần thiết
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    allowedHosts: ['rnmeg-194-87-86-21.a.free.pinggy.link', 'rnczb-194-87-86-21.a.free.pinggy.link', 'rndmw-194-87-86-21.a.free.pinggy.link'],
    host: true, // важно: разрешаем внешний доступ
    port: 5173, // если ты используешь другой порт — укажи его
  },
})

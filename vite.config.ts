import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Имитирует браузер
    globals: true,        // Разрешает использовать функции вроде describe и test без импорта
    setupFiles: './src/tests/setup.ts', // Файл первичной настройки
    pool: "threads"
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'],
  },
  resolve: {
    alias: [
      { find: /^(\.\.\/)+[Aa][Pp][Ii]\//, replacement: path.resolve(__dirname, 'src/API') + '/' },
      { find: /^(\.\.\/)+[Ss]ervice\//, replacement: path.resolve(__dirname, 'src/services') + '/' },
      { find: /^(\.\.\/)+[Ss]ervices\//, replacement: path.resolve(__dirname, 'src/services') + '/' },
    ],
  },
})

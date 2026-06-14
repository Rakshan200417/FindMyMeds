import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'],
  },
  resolve: {
    alias: {
      '../../api': path.resolve(__dirname, 'src/API'),
      '../../Api': path.resolve(__dirname, 'src/API'),
      '../../../api': path.resolve(__dirname, 'src/API'),
      '../../../Api': path.resolve(__dirname, 'src/API'),
      '../../../../api': path.resolve(__dirname, 'src/API'),
      '../../../../Api': path.resolve(__dirname, 'src/API'),
    },
  },
})

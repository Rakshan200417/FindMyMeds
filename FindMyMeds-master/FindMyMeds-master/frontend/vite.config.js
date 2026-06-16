import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function caseInsensitiveResolver() {
  return {
    name: 'case-insensitive-resolver',
    resolveId(source, importer) {
      if (!importer || source.startsWith('.') === false) return null
      const importerDir = path.dirname(importer)
      const resolved = path.resolve(importerDir, source)
      const dir = path.dirname(resolved)
      const base = path.basename(resolved)

      if (!fs.existsSync(dir)) return null
      if (fs.existsSync(resolved) || fs.existsSync(resolved + '.js') || fs.existsSync(resolved + '.jsx')) return null

      const files = fs.readdirSync(dir)
      const match = files.find(f => f.toLowerCase() === base.toLowerCase() ||
        f.toLowerCase() === (base + '.js').toLowerCase() ||
        f.toLowerCase() === (base + '.jsx').toLowerCase())

      if (match) {
        return path.join(dir, match)
      }
      return null
    }
  }
}

export default defineConfig({
  plugins: [react(), caseInsensitiveResolver()],
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'],
  },
})

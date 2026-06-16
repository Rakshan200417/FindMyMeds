import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function caseInsensitiveResolver() {
  return {
    name: 'case-insensitive-resolver',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer) return null
      if (!source.startsWith('.')) return null

      const importerDir = path.dirname(importer)
      const resolvedBase = path.resolve(importerDir, source)
      const dir = path.dirname(resolvedBase)
      const base = path.basename(resolvedBase)

      const exts = ['', '.js', '.jsx', '.ts', '.tsx']

      // First check if exact case already works
      for (const ext of exts) {
        if (fs.existsSync(resolvedBase + ext)) return null
      }

      // Walk the path segment by segment, fixing case as we go
      const parts = path.relative(process.cwd(), resolvedBase).split(path.sep)
      let current = process.cwd()

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        const isLast = i === parts.length - 1

        if (!fs.existsSync(current)) return null
        const entries = fs.readdirSync(current)

        let match = entries.find(e => e === part)

        if (!match && isLast) {
          // try with extensions
          for (const ext of exts) {
            match = entries.find(e => e.toLowerCase() === (part + ext).toLowerCase())
            if (match) break
          }
        }

        if (!match) {
          match = entries.find(e => e.toLowerCase() === part.toLowerCase())
        }

        if (!match) return null
        current = path.join(current, match)
      }

      return current
    }
  }
}

export default defineConfig({
  plugins: [react(), caseInsensitiveResolver()],
  optimizeDeps: {
    include: ['jspdf', 'jspdf-autotable'],
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/auth/, '')
      },
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false
      },
      '/sanctum': {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false
      },
      '/email': {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
    esbuild: {
    // ignora errores de tipo y path durante el build
    logOverride: { 'unused-import': 'silent' }
  }
})
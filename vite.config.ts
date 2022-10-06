import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import https from 'vite-plugin-mkcert'

export default defineConfig({
  preview: {
    https: true,
  },
  plugins: [https(), vue()]
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//https://github.com/snow2650/ShadeMap.git
export default defineConfig({
  plugins: [react()],
  base: '/ShadeMap/'
})

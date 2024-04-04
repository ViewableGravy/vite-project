import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { kawaiiScssVarsPlugin } from './vite/scss-plugin'
import Inspect from 'vite-plugin-inspect'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    Inspect(),
    react(), 
    kawaiiScssVarsPlugin()
  ],
})

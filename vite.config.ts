import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { scssTypescriptGenerator } from 'scss-typescript-generator/src'
import Inspect from 'vite-plugin-inspect'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    Inspect(),
    react(), 
    scssTypescriptGenerator()
  ],
})

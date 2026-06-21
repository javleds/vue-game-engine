import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

const engineSourcePath = fileURLToPath(new URL('../../src', import.meta.url))
const vueBundlerPath = fileURLToPath(new URL('../../node_modules/vue/dist/vue.esm-bundler.js', import.meta.url))

export default defineConfig({
  root: 'docs/screenshots',
  plugins: [vue()],
  resolve: {
    alias: {
      '@engine': engineSourcePath,
      vue: vueBundlerPath,
    },
    preserveSymlinks: true,
  },
})

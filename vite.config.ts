import { defineConfig } from 'vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

export default defineConfig({
  plugins: [
    contentCollections(),
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackRouter(),
    viteReact(),
  ],
})

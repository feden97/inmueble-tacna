import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [react()]

  // Bypasses the Cloudflare workerd runtime on macOS < 13 during local development
  if (command !== 'serve') {
    try {
      const { cloudflare } = await import("@cloudflare/vite-plugin")
      plugins.push(cloudflare())
    } catch (e) {
      console.warn("Could not load Cloudflare plugin:", e)
    }
  }

  return {
    plugins,
    base: './',
    server: {
      host: true,
      port: 5175
    }
  }
})
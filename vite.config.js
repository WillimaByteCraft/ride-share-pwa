import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'user-96.png', 'map-icon.jpg', 'silver-car.png', 'yellow-car.png'],
      manifest: {
        name: 'Ride Share PWA',
        short_name: 'Hail',
        description: 'A modern ride-hailing PWA built with React',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/ride-share-pwa/',
        start_url: '/ride-share-pwa/',
        icons: [
          {
            src: 'app-icon-192.png', // Replace with a 192x192 icon if you have one later
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'app-icon-512.png', // Replace with a 512x512 icon if you have one later
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/ride-share-pwa/',
})

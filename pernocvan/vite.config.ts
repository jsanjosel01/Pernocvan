import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite" // <--- 1. Importamos el plugin
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
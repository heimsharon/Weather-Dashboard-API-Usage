import { defineConfig } from "vite";


export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

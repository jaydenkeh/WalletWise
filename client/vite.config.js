import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api": "https://beautiful-lion-gown.cyclic.app/",
      "/api": "http://localhost:3000/",
    },
  },
  plugins: [react()],
});

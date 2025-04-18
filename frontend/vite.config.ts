import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      assets: path.resolve(__dirname, "./src/assets"),
      contexts: path.resolve(__dirname, "./src/contexts"),
      error: path.resolve(__dirname, "./src/error"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      pages: path.resolve(__dirname, "./src/pages"),
      router: path.resolve(__dirname, "./src/router"),
      services: path.resolve(__dirname, "./src/services"),
      types: path.resolve(__dirname, "./src/types"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});

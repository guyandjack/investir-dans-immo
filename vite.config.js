import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path"; // important

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

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
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        cgu: path.resolve(__dirname, "public/cgu.html"),
        contact: path.resolve(__dirname, "public/contact.html"),
        politique: path.resolve(__dirname, "public/politique-de-confidentialite.html"),
      },
    },
  },
});

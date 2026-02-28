import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestRaw = fs.readFileSync(
  new URL("./public/manifest.webmanifest", import.meta.url),
  "utf-8",
);

const manifest = JSON.parse(manifestRaw.replace(/^\uFEFF/, "").trim());

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      includeAssets: [
        "icons/apple-icon-180.png",
        "icons/icon-192.webp",
        "icons/icon-512.webp",
        "icons/icon-maskable.webp",
        "icons/manifest-icon-192.maskable.png",
        "icons/manifest-icon-512.maskable.png",
      ],
      manifest,
      srcDir: "src",
      injectManifest: {
        swSrc: "src/service-worker.js",
        swDest: "pwa-sw.js",
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
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
        politique: path.resolve(
          __dirname,
          "public/politique-de-confidentialite.html",
        ),
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "three"],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Three.js ecosystem — biggest chunk, lazy loaded
          if (id.includes("three") || id.includes("@react-three")) {
            return "three-vendor";
          }
          // Framer Motion — second biggest, lazy loaded below fold
          if (id.includes("framer-motion")) {
            return "motion";
          }
          // React core — always needed
          if (id.includes("react-dom") || id.includes("react/") || id.includes("react-router")) {
            return "react-vendor";
          }
          // Lenis smooth scroll
          if (id.includes("lenis")) {
            return "lenis";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
      // Prevent bundling react into each chunk
      external: [],
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "@studio-freight/lenis"],
    exclude: ["@react-three/fiber", "@react-three/drei", "three"],
  },
});

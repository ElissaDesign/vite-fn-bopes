// vite.config.js
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: "dist", // Specify the output directory for the build
    assetsInlineLimit: 0, // Remove the file size limit for inlining assets
    rollupOptions: {
      input: {
        main: "./index.html", // Entry point of your application
      },
    },
  },
});

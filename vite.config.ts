import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
// import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    // visualizer({
    //   open: true,
    //   filename: "stats.html",
    //   template: "treemap",
    // }),
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
    }),
  ],
  base: "",
  server: {
    port: 8000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf("node_modules") !== -1) {
            const modulePath = id.split("node_modules/").pop();
            const module = modulePath ? modulePath.split("/")[0] : "";
            return `vendor-${module}`;
          }
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});

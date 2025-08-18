import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
// import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    // visualizer({
    //   open: true, // 빌드 완료 후 브라우저에서 결과 자동 오픈
    //   filename: "stats.html", // 결과 파일 이름 (기본: stats.html)
    //   template: "treemap", // 시각화 형식: sunburst, treemap, network 중 선택 가능
    // }),
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // 10KB 이상 파일만 압축
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

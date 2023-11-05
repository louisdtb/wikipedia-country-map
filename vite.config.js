import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://louisdtb.github.io/wikipedia-country-map/",
  plugins: [react(), svgrPlugin()],
  css: { postcss: { plugins: [] } },
});

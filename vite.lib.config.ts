import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PulseUI",
      fileName: (format) => `index.${format === "es" ? "esm" : format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        exports: "named",
        preserveModules: false,
      },
    },
    outDir: "dist",
    emptyOutDir: false,
    sourcemap: true,
    minify: false,
    target: "es2015",
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // You can add global SCSS variables here if needed
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
});

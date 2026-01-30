
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/node-build.ts"),
      name: "server",
      formats: ["es"],
      fileName: () => "index.mjs", // better for Node server
    },

    outDir: "dist/server",
    target: "node22",
    ssr: true,
    emptyOutDir: true,
    minify: false,
    sourcemap: true,

    rollupOptions: {
      external: [
        // Node built-ins (auto-detected but still safe to list)
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",

        // Keep dependencies external (recommended for server)
        "express",
        "cors",
      ],

      output: {
        format: "es",
        entryFileNames: "index.mjs",
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

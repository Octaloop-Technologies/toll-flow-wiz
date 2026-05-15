import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    },
    server: {
      allowedHosts: [
        "e-tolling.com",
        "a6g4me6sci3s95sybrdlx5e7.coolify.octaloop.dev",
        "workflow-ettm.octaloop.dev",
      ],
    },
  },

  tanstackStart: {
    server: {
      entry: "server",
      preset: "node", // ← Switch from cloudflare to node
    },
  },
});
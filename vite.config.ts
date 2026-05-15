import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({

  tanstackStart: {
    server: {
      allowedHosts: ["a6g4me6sci3s95sybrdlx5e7.coolify.octaloop.dev", "workflow-ettm.octaloop.dev"],
      entry: "server",
      preset: "node", // ← Switch from cloudflare to node
    },
  },
});
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
      preset: "node", // ← Switch from cloudflare to node
    },
  },
});
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  vite: {
    plugins: [nodePolyfills()],
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
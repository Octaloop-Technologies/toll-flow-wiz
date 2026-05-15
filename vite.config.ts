import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  vite: {
    plugins: [
      nodePolyfills({
        exclude: ["stream"], // ← Don't polyfill stream; SSR needs the real Node one
      }),
    ],
    resolve: {
      alias: {
        // Fallback: if stream-browserify/web is still imported, point to Node's built-in
        "stream-browserify/web": "node:stream/web",
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
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
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/imkaisure.github.io/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },

    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});

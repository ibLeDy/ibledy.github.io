import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://iagoalonso.xyz",
  output: "static",
  build: {
    inlineStylesheets: "never",
  },
  compressHTML: true,
});

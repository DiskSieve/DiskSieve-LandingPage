// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Served by GitHub Pages under the custom domain (public/CNAME, added in step 1.3).
  site: "https://disksieve.chrubasik.dev",
  output: "static",
});

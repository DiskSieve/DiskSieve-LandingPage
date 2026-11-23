// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Served by GitHub Pages under the custom domain (public/CNAME, added in step 1.3).
  site: "https://disksieve.chrubasik.dev",
  output: "static",
  // The whole stylesheet is ~7 KB gzip: inlined, it no longer blocks the first render as a separate request.
  build: { inlineStylesheets: "always" },
  // CSP as a <meta> tag (spec 2.7). Astro adds hashes of its inline scripts to script-src, so no 'unsafe-inline' is
  // needed there. Styles keep 'unsafe-inline' for style attributes (reveal delays, counter widths); fonts allow data:
  // for the small font subsets Vite inlines.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self' https://api.github.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

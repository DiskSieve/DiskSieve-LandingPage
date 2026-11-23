// Builds the live demo (spec 2.9): the DiskSieve app's own frontend in its browser mode with demo data, served at
// /demo/. The app repository is only read: CI checks out its latest release into `.demo-app/`, this script builds it
// with the /demo/ base, copies it into dist/demo/ and adds what the landing page needs (noindex, mobile notice).
//
// Usage (after `npm run build`): node scripts/demo.mjs [appDir]
import { execSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const appDir = resolve(root, process.argv[2] ?? ".demo-app");
const out = join(root, "dist", "demo");

if (!existsSync(join(appDir, "package.json"))) throw new Error(`No app checkout in ${appDir}`);
if (!existsSync(join(root, "dist", "index.html"))) throw new Error("Run `npm run build` first");

const run = (cmd) => execSync(cmd, { cwd: appDir, stdio: "inherit", env: { ...process.env, MSYS_NO_PATHCONV: "1" } });
run("npm ci --no-audit --no-fund");
run("npx vite build --base=/demo/ --emptyOutDir");

rmSync(out, { recursive: true, force: true });
cpSync(join(appDir, "dist"), out, { recursive: true });
copyFileSync(join(root, "scripts", "demo-notice.js"), join(out, "notice.js"));
// Leftovers of the app's UI template: the site's own icons and robots.txt apply instead.
for (const file of ["favicon.ico", "robots.txt"]) rmSync(join(out, file), { force: true });

// Same policy as the site (astro.config.mjs), with inline styles for the app's boot loader and charts.
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

const head = [
  `<meta http-equiv="content-security-policy" content="${csp}" />`,
  '<meta name="robots" content="noindex" />',
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
  '<link rel="icon" href="/favicon.ico" sizes="any" />',
  '<script src="/demo/notice.js" defer></script>',
].join("\n    ");

const indexPath = join(out, "index.html");
const html = readFileSync(indexPath, "utf8");
const icon = /\s*<link rel="icon"[^>]*>/;
const title = /<title>[^<]*<\/title>/;
const charset = /<meta charset="[^"]*"\s*\/?>/;
if (!icon.test(html) || !title.test(html) || !charset.test(html)) throw new Error("Unexpected demo index.html");
writeFileSync(
  indexPath,
  html
    .replace(icon, "")
    .replace(title, "<title>Live demo · DiskSieve</title>")
    // Right after the charset, so the CSP comes before anything it applies to.
    .replace(charset, (m) => `${m}\n    ${head}`),
);
console.log(`Demo built into ${out}`);

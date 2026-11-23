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

const indexPath = join(out, "index.html");
const html = readFileSync(indexPath, "utf8");
if (!html.includes("</head>")) throw new Error("Unexpected demo index.html");
writeFileSync(
  indexPath,
  html.replace(
    "</head>",
    '  <meta name="robots" content="noindex" />\n    <script src="/demo/notice.js" defer></script>\n  </head>',
  ),
);
console.log(`Demo built into ${out}`);

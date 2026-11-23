/**
 * WebMCP tools (https://developer.chrome.com/docs/ai/webmcp): lets an AI agent in the browser answer questions about
 * DiskSieve and fetch the right installer without scraping the page. Registered only where the browser exposes
 * `document.modelContext` (Chrome with the WebMCP origin trial or flag); everywhere else this does nothing.
 *
 * The tools reuse what the page already has: `/llms.txt` for the overview, the FAQPage JSON-LD for questions and the
 * shared GitHub release lookup for downloads.
 */
import { downloadTargets, links } from "../content/site";
import { fetchRelease, find, formatSize } from "./release";

interface Tool {
  name: string;
  description: string;
  inputSchema: { type: "object"; properties: Record<string, unknown>; required?: string[] };
  annotations?: { readOnlyHint?: boolean };
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

interface ModelContext {
  registerTool: (tool: Tool) => unknown;
}

const modelContext =
  (document as Document & { modelContext?: ModelContext }).modelContext ??
  (navigator as Navigator & { modelContext?: ModelContext }).modelContext;

const osValues = downloadTargets.map((t) => t.os);

const tools: Tool[] = [
  {
    name: "get_disksieve_overview",
    description:
      "Describes DiskSieve, a free, open-source, offline disk space analyzer for Windows, macOS and Linux: what it does, its features, privacy, supported systems, roadmap and FAQ. Returns Markdown.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () => (await fetch("/llms.txt")).text(),
  },
  {
    name: "get_download_links",
    description:
      "Returns direct download links for the latest DiskSieve release: installers and portable builds with file names and sizes, plus the SHA256SUMS.txt checksum file. Optionally limited to one operating system.",
    inputSchema: {
      type: "object",
      properties: {
        os: { type: "string", enum: osValues, description: "Operating system to list files for. Omit for all." },
      },
    },
    annotations: { readOnlyHint: true },
    execute: async ({ os }) => {
      const release = await fetchRelease();
      if (!release) return { error: "GitHub is unreachable right now.", releasePage: links.latestRelease };
      const targets = downloadTargets.filter((t) => !os || t.os === os);
      const files = targets.flatMap((t) =>
        t.files.flatMap((f) => {
          const asset = find(release.assets, f.pattern);
          return asset
            ? [
                {
                  os: t.os,
                  system: `${t.name} ${t.detail}`,
                  kind: f.label,
                  file: asset.name,
                  size: formatSize(asset.size),
                  url: asset.url,
                },
              ]
            : [];
        }),
      );
      const checksums = find(release.assets, "^SHA256SUMS");
      return {
        version: release.version,
        date: release.date,
        files,
        checksums: checksums?.url ?? null,
        releasePage: links.latestRelease,
        note: "The installers are not code-signed yet; Windows SmartScreen and macOS Gatekeeper warn on first launch.",
      };
    },
  },
  {
    name: "search_faq",
    description:
      "Searches the DiskSieve FAQ (price, privacy, safe deletion, unsigned installer warnings, supported systems, comparison with other tools). Returns matching questions and answers; an empty query returns all of them.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Words to look for, e.g. 'delete' or 'macOS'." } },
    },
    annotations: { readOnlyHint: true },
    execute: async ({ query }) => {
      const words = String(query ?? "")
        .toLowerCase()
        .split(/\W+/)
        .filter(Boolean);
      const faq: { q: string; a: string }[] = [];
      for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
        const graph = (JSON.parse(script.textContent ?? "{}")["@graph"] ?? []) as {
          "@type": string;
          mainEntity?: { name: string; acceptedAnswer: { text: string } }[];
        }[];
        for (const node of graph)
          if (node["@type"] === "FAQPage")
            for (const item of node.mainEntity ?? []) faq.push({ q: item.name, a: item.acceptedAnswer.text });
      }
      return faq.filter(({ q, a }) => words.every((w) => `${q} ${a}`.toLowerCase().includes(w)));
    },
  },
  {
    name: "open_live_demo",
    description:
      "Opens the live demo: the real DiskSieve interface running in the browser with example data. It cannot scan the visitor's disk.",
    inputSchema: { type: "object", properties: {} },
    execute: async () => {
      location.assign("/demo/");
      return "Opening the live demo.";
    },
  },
];

if (modelContext && typeof modelContext.registerTool === "function") {
  for (const tool of tools) {
    try {
      void Promise.resolve(modelContext.registerTool(tool)).catch(() => {});
    } catch {
      /* an older or different WebMCP implementation: skip the tool */
    }
  }
}

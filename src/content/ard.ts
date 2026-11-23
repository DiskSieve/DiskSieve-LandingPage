/**
 * Agentic Resource Discovery manifest (https://agenticresourcediscovery.org/spec/, v0.91): tells AI agents what this
 * site offers them. Served at /.well-known/ard.json and, for older readers such as Lighthouse 13.5, at
 * /.well-known/ai-catalog.json.
 */
import { SITE } from "./seo";

const publisher = new URL(SITE).hostname;

export const ardManifest = () => ({
  entries: [
    {
      identifier: `urn:air:${publisher}:docs:llms-txt`,
      displayName: "DiskSieve overview for AI assistants",
      type: "text/markdown",
      url: `${SITE}/llms.txt`,
      description:
        "A Markdown summary of DiskSieve, the free, offline disk space analyzer: features, privacy, downloads, roadmap and FAQ (llmstxt.org format).",
      tags: ["disk space analyzer", "storage cleanup", "open source", "windows", "macos", "linux"],
      representativeQueries: [
        "what is DiskSieve and what does it do",
        "is DiskSieve free and does it send my data anywhere",
        "how is DiskSieve different from WinDirStat or WizTree",
      ],
    },
    {
      identifier: `urn:air:${publisher}:webmcp:website`,
      displayName: "DiskSieve website tools (WebMCP)",
      type: "text/html",
      url: `${SITE}/`,
      description:
        "The DiskSieve home page registers WebMCP tools in supporting browsers: get_disksieve_overview, get_download_links, search_faq and open_live_demo.",
      capabilities: ["get_disksieve_overview", "get_download_links", "search_faq", "open_live_demo"],
      representativeQueries: [
        "download DiskSieve for Windows",
        "get the DiskSieve installer for macOS",
        "try DiskSieve in the browser",
      ],
    },
  ],
});

export const ardResponse = () =>
  new Response(`${JSON.stringify(ardManifest(), null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

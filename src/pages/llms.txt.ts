import type { APIRoute } from "astro";
import { llmsTxt } from "../content/seo";

/** https://llmstxt.org: a Markdown summary of DiskSieve for AI assistants. */
export const GET: APIRoute = () =>
  new Response(llmsTxt(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });

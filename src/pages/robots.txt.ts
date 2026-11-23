import type { APIRoute } from "astro";
import { SITE } from "../content/seo";

/**
 * Every crawler is welcome, search engines and AI assistants alike. The live demo is not blocked here: it carries
 * `noindex` itself, which crawlers can only see if they may fetch it.
 */
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });

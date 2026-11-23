/**
 * Machine-readable descriptions of the site (step 3.1): JSON-LD for search engines and `/llms.txt` for AI assistants.
 * Everything is built from `site.ts`, so the copy stays in one place.
 */
import { downloadTargets, faq, features, hero, links, meta, privacy, release, roadmap, why } from "./site";

export const SITE = "https://disksieve.chrubasik.dev";
const abs = (path: string) => new URL(path, SITE).href;

/**
 * Chrome origin trial token for WebMCP (src/scripts/webmcp.ts), registered for this origin at
 * https://developer.chrome.com/origintrials. Public by design; empty means no `<meta http-equiv="origin-trial">`.
 * Expires 2027-03-30 (Chrome 149–162); renew it, or remove it once WebMCP ships without a trial.
 */
export const webmcpOriginTrial =
  "AlgxDPXOPgix4tShghPzX6C8aC+v7FkeWEo3G9cCL4oHQww2zY5q4QwwBPRrZZfUPdN9vXe1iDsqdbe+B1ZfawEAAABXeyJvcmlnaW4iOiJodHRwczovL2Rpc2tzaWV2ZS5jaHJ1YmFzaWsuZGV2OjQ0MyIsImZlYXR1cmUiOiJXZWJNQ1AiLCJleHBpcnkiOjE4MDYzNjQ4MDB9";

export const ogImage = {
  src: "/og.png",
  width: 1200,
  height: 630,
  alt: "DiskSieve: know what takes space, what's safe to delete, and what grew. A screenshot of the app next to the headline.",
} as const;

/** JSON-LD graph for the home page: the website, the app and the FAQ. */
export const structuredData = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "DiskSieve",
      description: meta.description,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#app`,
      name: "DiskSieve",
      description: hero.subtitle,
      url: `${SITE}/`,
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Disk space analyzer",
      operatingSystem: "Windows 10, Windows 11, macOS, Linux",
      softwareVersion: release.version,
      datePublished: release.date,
      downloadUrl: links.latestRelease,
      releaseNotes: links.changelog,
      license: "https://opensource.org/license/mit",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      image: abs(ogImage.src),
      sameAs: [links.repo],
      featureList: [...why.items, ...features.items].map((f) => f.title.replace(/[“”]/g, "")),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
});

/** `/llms.txt` (https://llmstxt.org): a plain Markdown summary of the product for AI assistants and agents. */
export const llmsTxt = () => {
  const list = (items: readonly { title: string; text: string }[]) =>
    items.map((i) => `- **${i.title.replace(/[“”]/g, "")}**: ${i.text}`).join("\n");
  const platforms = downloadTargets
    .map((t) => `- ${t.name} (${t.detail}): ${t.files.map((f) => `${f.label} (${f.ext})`).join(", ")}`)
    .join("\n");

  return `# DiskSieve

> ${meta.description}

DiskSieve is a desktop app, not a web service. It is free and open source (MIT), has no account, no telemetry and no cloud; scans and results stay on the user's computer. Latest version: ${release.version} (${release.date}).

## Main features

${list(why.items.map((i) => ("comingIn" in i ? { ...i, title: `${i.title} (coming in ${i.comingIn})` } : i)))}

## Other features

${list(features.items)}

## Privacy and safety

${list(privacy.items)}

## Download

All installers are on GitHub Releases: ${links.latestRelease}

${platforms}

The installers are not code-signed yet, so Windows SmartScreen and macOS Gatekeeper show a warning on first launch. Each release includes SHA256SUMS.txt to verify the download.

## Roadmap

${roadmap.items.map((i) => `- ${i.version} (${i.status}): ${i.text}`).join("\n")}

## FAQ

${faq.items.map((i) => `### ${i.q}\n\n${i.a}`).join("\n\n")}

## Links

- [Website](${SITE}/)
- [Live demo in the browser, with example data](${SITE}/demo/)
- [Source code](${links.repo})
- [Releases](${links.releases})
- [Changelog](${links.changelog})
- [Issues](${links.issues})
`;
};

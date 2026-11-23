/**
 * Progressive enhancement of the download links (spec 2.4).
 *
 * Without JavaScript every link points to the latest release page on GitHub. With it, this script reads the latest
 * release from the GitHub API (no auth, cached in sessionStorage because of the 60 requests/hour limit), detects the
 * visitor's system and turns the links into direct downloads with file sizes. On any failure the page stays as it is.
 */
import { downloadTargets, hero, links, type Os } from "../content/site";

interface Asset {
  name: string;
  size: number;
  url: string;
}

interface Release {
  version: string;
  date: string;
  assets: Asset[];
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: { name: string; size: number; browser_download_url: string }[];
}

interface UserAgentData {
  platform?: string;
}

const CACHE_KEY = "disksieve:release";
const CACHE_TTL_MS = 60 * 60 * 1000;

const readCache = (): Release | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, release } = JSON.parse(raw) as { at: number; release: Release };
    return Date.now() - at < CACHE_TTL_MS ? release : null;
  } catch {
    return null;
  }
};

const writeCache = (release: Release) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), release }));
  } catch {
    /* storage unavailable (private mode, blocked): fetch again next time */
  }
};

const fetchRelease = async (): Promise<Release | null> => {
  const cached = readCache();
  if (cached) return cached;
  try {
    const res = await fetch(links.latestReleaseApi, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return null;
    const data = (await res.json()) as GitHubRelease;
    if (!data.tag_name || !Array.isArray(data.assets)) return null;
    const release: Release = {
      version: data.tag_name.replace(/^v/, ""),
      date: data.published_at.slice(0, 10),
      assets: data.assets.map((a) => ({ name: a.name, size: a.size, url: a.browser_download_url })),
    };
    writeCache(release);
    return release;
  } catch {
    return null;
  }
};

/** Desktop system of the visitor, or null (phones, tablets, ChromeOS, unknown). */
const detectOs = (): Os | null => {
  const uaData = (navigator as Navigator & { userAgentData?: UserAgentData }).userAgentData;
  const p = `${uaData?.platform ?? ""} ${navigator.userAgent}`;
  if (/android|iphone|ipad|ipod|cros/i.test(p)) return null;
  // iPadOS reports itself as a Mac; a touch screen gives it away.
  if (/mac/i.test(p)) return navigator.maxTouchPoints > 1 ? null : "macos";
  if (/win/i.test(p)) return "windows";
  if (/linux|x11/i.test(p)) return "linux";
  return null;
};

const formatSize = (bytes: number) =>
  bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.max(0.1, bytes / 1e6).toFixed(1)} MB`;

const find = (assets: Asset[], pattern: string) => {
  const re = new RegExp(pattern, "i");
  const matches = assets.filter((a) => re.test(a.name));
  // If a release ever ships per-architecture files, prefer Apple Silicon / 64-bit builds.
  return matches.find((a) => /aarch64|arm64|universal/i.test(a.name)) ?? matches[0];
};

const setText = (selector: string, text: string) => {
  for (const el of document.querySelectorAll<HTMLElement>(selector)) el.textContent = text;
};

const apply = (release: Release, os: Os | null) => {
  setText("[data-release-version]", `v${release.version}`);
  setText("[data-release-date]", release.date);

  // Every file row (cards and checksums): direct link + size.
  for (const a of document.querySelectorAll<HTMLAnchorElement>("a[data-asset-pattern]")) {
    const asset = find(release.assets, a.dataset.assetPattern ?? "");
    if (!asset) continue;
    a.href = asset.url;
    a.title = asset.name;
    const size = a.querySelector<HTMLElement>("[data-asset-size]");
    if (size) size.textContent = formatSize(asset.size);
  }

  if (!os) return;
  const target = downloadTargets.find((t) => t.os === os);
  const primary = target && find(release.assets, target.files[0].pattern);
  if (!target || !primary) return;
  for (const a of document.querySelectorAll<HTMLAnchorElement>("a[data-download-primary]")) {
    a.href = primary.url;
    a.title = primary.name;
    const label = a.querySelector<HTMLElement>("[data-download-label]");
    if (label) label.textContent = `${hero.primaryCtaFor} ${target.name}`;
  }
  setText("[data-primary-size]", formatSize(primary.size));
  for (const el of document.querySelectorAll<HTMLElement>("[data-primary-size-wrap]")) el.hidden = false;
};

const os = detectOs();
if (os) document.querySelector(`[data-os-card="${os}"]`)?.setAttribute("data-detected", "");
void fetchRelease().then((release) => {
  if (release) apply(release, os);
});

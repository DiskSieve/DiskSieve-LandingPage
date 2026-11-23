/**
 * The latest DiskSieve release from the GitHub API, shared by the download links and the WebMCP tools. No auth, so the
 * result is cached in sessionStorage for an hour (60 requests/hour limit). Resolves to null on any failure.
 */
import { links } from "../content/site";

export interface Asset {
  name: string;
  size: number;
  url: string;
}

export interface Release {
  version: string;
  date: string;
  assets: Asset[];
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: { name: string; size: number; browser_download_url: string }[];
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

let pending: Promise<Release | null> | undefined;

/** Every caller on the page shares one request. */
export const fetchRelease = (): Promise<Release | null> => (pending ??= load());

const load = async (): Promise<Release | null> => {
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

export const formatSize = (bytes: number) =>
  bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.max(0.1, bytes / 1e6).toFixed(1)} MB`;

export const find = (assets: Asset[], pattern: string) => {
  const re = new RegExp(pattern, "i");
  const matches = assets.filter((a) => re.test(a.name));
  // If a release ever ships per-architecture files, prefer Apple Silicon / 64-bit builds.
  return matches.find((a) => /aarch64|arm64|universal/i.test(a.name)) ?? matches[0];
};

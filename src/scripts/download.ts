/**
 * Progressive enhancement of the download links (spec 2.4).
 *
 * Without JavaScript every link points to the latest release page on GitHub. With it, this script reads the latest
 * release from the GitHub API (no auth, cached in sessionStorage because of the 60 requests/hour limit), detects the
 * visitor's system and turns the links into direct downloads with file sizes. On any failure the page stays as it is.
 */
import { downloadTargets, hero, type Os } from "../content/site";
import { fetchRelease, find, formatSize, type Release } from "./release";

interface UserAgentData {
  platform?: string;
}

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

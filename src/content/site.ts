/**
 * All copy and data of the website in one place.
 *
 * Update on every app release: `release`, feature `since`/`comingIn` labels, `roadmap` and the FAQ.
 * Only describe what ships in a published release; planned items carry `comingIn`.
 */

export const repo = "https://github.com/DiskSieve/disksieve";

export const links = {
  repo,
  releases: `${repo}/releases`,
  latestRelease: `${repo}/releases/latest`,
  latestReleaseApi: "https://api.github.com/repos/DiskSieve/disksieve/releases/latest",
  issues: `${repo}/issues`,
  changelog: `${repo}/blob/main/CHANGELOG.md`,
  license: `${repo}/blob/main/LICENSE`,
} as const;

/** Latest release at build time. The download script replaces it with live data from the GitHub API. */
export const release = {
  version: "0.2.0",
  date: "2026-11-22",
} as const;

export const meta = {
  title: "DiskSieve — fast, offline disk space analyzer",
  description:
    "A fast, offline disk space analyzer for developers and power users. See what takes space, what is safe to delete and what grew since last time. Free and open source for Windows, macOS and Linux.",
} as const;

export const nav = [
  { href: "#features", label: "Features" },
  { href: "#download", label: "Download" },
  { href: "#faq", label: "FAQ" },
] as const;

export const platforms = ["Windows", "macOS", "Linux"] as const;

export const hero = {
  eyebrow: "Free and open source · Windows · macOS · Linux",
  title: "Know what takes space, what's safe to delete, and what grew.",
  subtitle:
    "DiskSieve is a fast, offline disk space analyzer for developers and power users. It finds the gigabytes and tells you which ones you can let go.",
  primaryCta: "Download",
  secondaryCta: "View on GitHub",
  otherPlatforms: "Other platforms",
  screenshotAlt:
    "DiskSieve showing the Downloads folder: a list of the largest files on the left and a treemap of the same files on the right.",
} as const;

/** Lucide icon names, rendered as inline SVG at build time. */
export type IconName =
  | "shield-check"
  | "package"
  | "git-compare"
  | "shopping-basket"
  | "scale"
  | "zap"
  | "layout-grid"
  | "copy"
  | "search"
  | "trash-2"
  | "refresh-cw"
  | "cloud-off"
  | "wifi-off"
  | "eye-off"
  | "code";

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
  /** Version that will ship it; set only for features that are not released yet. */
  comingIn?: string;
}

export const why = {
  title: "More than a treemap",
  subtitle: "Most disk analyzers stop at showing what is big. DiskSieve helps you decide what to do about it.",
  items: [
    {
      icon: "shield-check",
      title: "“Can I delete this?”",
      text: "The Safety Advisor explains well-known system files and caches — the hibernation file, the page file, WinSxS, Windows.old, shader, browser and package manager caches — whether they are safe to remove and the right way to free the space.",
    },
    {
      icon: "package",
      title: "Dev Junk",
      text: "Finds build artifacts and dependencies of your projects — node_modules, target, .venv and more — recognized by their project files, with the size of each and how long ago you touched it.",
    },
    {
      icon: "git-compare",
      title: "What grew since last time",
      text: "Every scan saves a small snapshot. Delta Mode colors the treemap by change, and the Changes view lists everything that appeared, grew, shrank or disappeared — like a git diff for your disk.",
    },
    {
      icon: "shopping-basket",
      title: "Sieve Basket",
      text: "Collect items from every view, review them with Safety Advisor verdicts and the total you will free, then move everything to Trash with one confirmation.",
    },
    {
      icon: "scale",
      title: "Space Reconciliation",
      text: "Explains the gap between what your system reports as used and what the scan found: restore points, shadow copies, hidden and inaccessible files. Today DiskSieve already shows how much it could not see.",
      comingIn: "v0.3",
    },
  ] satisfies Feature[],
} as const;

export const features = {
  title: "Everything else you'd expect",
  items: [
    {
      icon: "zap",
      title: "Fast parallel scan",
      text: "Scans folders in parallel on all CPU cores and keeps the whole tree in a compact in-memory index.",
    },
    {
      icon: "layout-grid",
      title: "Treemap and list",
      text: "A treemap and a sorted list of the same folder, colored by file type, with size on disk or logical size.",
    },
    {
      icon: "copy",
      title: "Duplicate finder",
      text: "Compares files of the same size by their first and last 16 KiB, then by a full BLAKE3 hash. Hard links are not counted as copies.",
    },
    {
      icon: "search",
      title: "Instant search",
      text: "Press Ctrl+K to find any file or folder in the scan by name and jump straight to it.",
    },
    {
      icon: "trash-2",
      title: "Trash, never delete",
      text: "Everything goes to the system Trash. The core refuses to touch system folders, your home folder and the drive root, whatever the UI asks.",
    },
    {
      icon: "cloud-off",
      title: "Cloud-aware",
      text: "Online-only OneDrive and iCloud files are recognized and never opened, so nothing gets downloaded by accident.",
    },
    {
      icon: "refresh-cw",
      title: "Signed updates",
      text: "New versions are offered from the title bar and verified with a signature before they install.",
    },
    {
      icon: "code",
      title: "Accurate by design",
      text: "Does not follow symlinks or junctions, stays on one drive, counts hard links once and shows both logical size and size on disk.",
    },
  ] satisfies Feature[],
} as const;

export const privacy = {
  title: "Your files stay yours",
  subtitle: "DiskSieve runs entirely on your computer.",
  items: [
    {
      icon: "wifi-off",
      title: "Offline",
      text: "No account and no cloud. The only network request is the update check against GitHub Releases.",
    },
    {
      icon: "eye-off",
      title: "No telemetry",
      text: "No analytics, no crash reporting, no tracking — in the app and on this website.",
    },
    {
      icon: "shield-check",
      title: "Safe by default",
      text: "Deletion only moves items to Trash, after checking that they have not changed since the scan.",
    },
    {
      icon: "code",
      title: "Open source",
      text: "MIT-licensed Rust and TypeScript. Read the code, build it yourself, report issues.",
    },
  ] satisfies Feature[],
} as const;

export const download = {
  title: "Download DiskSieve",
  subtitle: "Free, open source and offline. Pick the file for your system.",
  unsignedNote:
    "The installers are not code-signed yet, so Windows and macOS show a warning the first time you open them. Signing is planned for v1.0.",
  steps: {
    windows: "Windows SmartScreen: click “More info”, then “Run anyway”. The portable .exe needs no installation.",
    macos: "macOS: open the app once, then go to System Settings → Privacy & Security and click “Open Anyway”.",
    linux: "Linux: make the AppImage executable (chmod +x) and run it, or install the .deb or .rpm package.",
  },
  verify: {
    title: "Verify your download",
    text: "Every release includes SHA256SUMS.txt. Compare it with the checksum of the file you downloaded:",
    commands: {
      windows: "Get-FileHash .\\DiskSieve_x64-setup.exe -Algorithm SHA256",
      unix: "shasum -a 256 DiskSieve.AppImage",
    },
  },
  allReleases: "All releases and release notes",
} as const;

export const roadmap = {
  title: "Roadmap",
  items: [
    {
      version: "v0.1",
      status: "released",
      text: "Fast scan, treemap and list, Dev Junk, Ctrl+K search, safe Trash, signed updates.",
    },
    {
      version: "v0.2",
      status: "released",
      text: "Safety Advisor, Sieve Basket, snapshots, Delta Mode, Changes view, duplicate finder.",
    },
    {
      version: "v0.3",
      status: "planned",
      text: "NTFS MFT engine for much faster scans on Windows, full size accuracy, Space Reconciliation.",
    },
    {
      version: "v0.4",
      status: "planned",
      text: "Settings, system integration, command-line interface with JSON output, CSV, JSON and Markdown reports.",
    },
    {
      version: "v1.0",
      status: "planned",
      text: "Stability and code-signed installers.",
    },
  ],
} as const satisfies { title: string; items: { version: string; status: "released" | "planned"; text: string }[] };

export const faq = {
  title: "Questions",
  items: [
    {
      q: "Is DiskSieve really free?",
      a: "Yes. It is open source under the MIT license, with no paid tier, ads or account.",
    },
    {
      q: "Does it send my data anywhere?",
      a: "No. Scans, snapshots and results stay on your computer. The only network request is the check for a new version on GitHub Releases.",
    },
    {
      q: "Does it delete files permanently?",
      a: "No. DiskSieve only moves items to the system Trash, so you can restore them. It refuses to touch system folders, your home folder and drive roots, and checks that a file has not changed since the scan before moving it.",
    },
    {
      q: "Why does Windows or macOS warn me when I open it?",
      a: "The installers are not code-signed yet. You can check the download against SHA256SUMS.txt from the release, or build DiskSieve from source. Signing is planned for v1.0.",
    },
    {
      q: "How is it different from other disk analyzers?",
      a: "Besides showing what takes space, DiskSieve explains what is safe to delete, finds development leftovers, shows what changed since the last scan and collects everything into one reviewed cleanup.",
    },
    {
      q: "Which systems are supported?",
      a: "Windows 10 and 11, macOS and Linux (AppImage, .deb and .rpm).",
    },
  ],
} as const;

export const footer = {
  note: "The DiskSieve app is MIT-licensed. This website, the DiskSieve name and logo are all rights reserved.",
  links: [
    { href: links.repo, label: "GitHub" },
    { href: links.releases, label: "Releases" },
    { href: links.issues, label: "Issues" },
    { href: links.changelog, label: "Changelog" },
  ],
} as const;

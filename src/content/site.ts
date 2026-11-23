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
  /** With JavaScript: "Download for Windows". */
  primaryCtaFor: "Download for",
  secondaryCta: "View on GitHub",
  otherPlatforms: "Other platforms",
} as const;

/** Hero screenshots (app demo data), in crossfade order. Files live in `src/assets/screens/<key>.png`. */
export const screens = [
  {
    key: "explorer",
    label: "Explorer",
    alt: "DiskSieve showing the Downloads folder: the largest files listed on the left and a treemap colored by file type on the right.",
  },
  {
    key: "devjunk",
    label: "Dev Junk",
    alt: "The Dev Junk view: 35 GB of node_modules, Rust target, Python venv and Gradle folders across 13 projects, with the last code edit for each.",
  },
  {
    key: "advisor",
    label: "Safety Advisor",
    alt: "The Safety Advisor for a 28.6 GB Docker cache folder: marked Safe to delete, with the command to reclaim the space.",
  },
  {
    key: "sieve",
    label: "Sieve",
    alt: "The Sieve basket with eight items worth 60.7 GB: seven marked Safe to delete and one marked Review first.",
  },
  {
    key: "changes",
    label: "Changes",
    alt: "The Changes view: 15.1 GB of growth since the previous scan, listing added, removed and grown files and folders.",
  },
  {
    key: "duplicates",
    label: "Duplicates",
    alt: "The Duplicates view: 34.5 GB wasted in five groups of identical files, with the copy to keep marked in each group.",
  },
] as const;

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
  | "code"
  | "check"
  | "minus"
  | "x";

export type ScreenKey = (typeof screens)[number]["key"];

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
  /** Version that will ship it; set only for features that are not released yet. */
  comingIn?: string;
  /** Screenshot from `screens` shown next to the feature. */
  screen?: ScreenKey;
}

export const why = {
  title: "More than a treemap",
  subtitle: "Most disk analyzers stop at showing what is big. DiskSieve helps you decide what to do about it.",
  /** Figures from the example scan in the screenshots (keep in sync with `screens` alt texts). */
  stats: [
    { value: "60.7", unit: "GB", label: "ready to free after one Sieve review" },
    { value: "35", unit: "GB", label: "of Dev Junk across 13 projects" },
    { value: "34.5", unit: "GB", label: "lost to duplicate files" },
  ],
  statsNote: "From the example scan in the screenshots.",
  items: [
    {
      icon: "shield-check",
      screen: "advisor",
      title: "“Can I delete this?”",
      text: "The Safety Advisor explains well-known system files and caches — the hibernation file, the page file, WinSxS, Windows.old, shader, browser and package manager caches — whether they are safe to remove and the right way to free the space.",
    },
    {
      icon: "package",
      screen: "devjunk",
      title: "Dev Junk",
      text: "Finds build artifacts and dependencies of your projects — node_modules, target, .venv and more — recognized by their project files, with the size of each and how long ago you touched it.",
    },
    {
      icon: "git-compare",
      screen: "changes",
      title: "What grew since last time",
      text: "Every scan saves a small snapshot. Delta Mode colors the treemap by change, and the Changes view lists everything that appeared, grew, shrank or disappeared — like a git diff for your disk.",
    },
    {
      icon: "shopping-basket",
      screen: "sieve",
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

/** A cell of the comparison table: "partial" always carries a note that says why. */
export type Support = "yes" | "no" | { partial: string };

/** Comparison with other tool categories (spec 2.5). Only facts that can be checked in public documentation. */
export const comparison = {
  title: "How it compares",
  subtitle: "Every tool here is good at its job. DiskSieve brings their best parts into one app.",
  columns: [
    "DiskSieve",
    "WizTree",
    "WinDirStat / SpaceSniffer",
    "TreeSize",
    "DaisyDisk",
    "ncdu / dust",
    "npkill / kondo",
    "Czkawka",
  ],
  rows: [
    {
      label: "Windows, macOS and Linux",
      values: ["yes", "no", "no", "no", "no", { partial: "No Windows build of ncdu" }, "yes", "yes"],
    },
    {
      label: "Open source",
      values: ["yes", "no", { partial: "WinDirStat only" }, "no", "no", "yes", "yes", "yes"],
    },
    {
      label: "Free",
      values: [
        "yes",
        { partial: "Free for personal use" },
        "yes",
        { partial: "Free edition, paid features" },
        "no",
        "yes",
        "yes",
        "yes",
      ],
    },
    {
      label: "Treemap",
      values: ["yes", "yes", "yes", "yes", { partial: "Sunburst chart" }, "no", "no", "no"],
    },
    {
      label: "Explains what is safe to delete",
      values: ["yes", "no", "no", "no", "no", "no", { partial: "npkill flags folders apps need" }, "no"],
    },
    {
      label: "Finds build artifacts of projects",
      values: ["yes", "no", "no", "no", "no", "no", "yes", "no"],
    },
    {
      label: "Shows what changed since the last scan",
      values: ["yes", "no", "no", { partial: "Paid editions" }, "no", "no", "no", "no"],
    },
    {
      label: "Duplicate files by content",
      values: [
        "yes",
        { partial: "By name and size" },
        { partial: "WinDirStat only" },
        { partial: "Paid editions" },
        "no",
        "no",
        "no",
        "yes",
      ],
    },
    {
      label: "Deletes only to Trash",
      values: [
        "yes",
        { partial: "Shift+Delete is permanent" },
        { partial: "Permanent delete too" },
        { partial: "Shift+Delete is permanent" },
        "no",
        "no",
        "no",
        { partial: "Trash is optional" },
      ],
    },
  ] satisfies { label: string; values: Support[] }[],
  note: "Based on public documentation as of November 2026. Corrections welcome:",
  correctionsLabel: "open an issue",
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

export type Os = "windows" | "macos" | "linux";

/**
 * Release files per system. `pattern` is matched against the asset names of the latest GitHub release
 * (verified on v0.2.0: `DiskSieve_0.2.0_x64-setup.exe`, `DiskSieve_0.2.0_universal.dmg`, …). The first file is the
 * one the hero button offers. Without JavaScript every row links to the latest release page.
 */
export const downloadTargets = [
  {
    os: "windows",
    name: "Windows",
    detail: "x64",
    files: [
      { label: "Installer", ext: ".exe", pattern: "-setup\\.exe$" },
      { label: "MSI package", ext: ".msi", pattern: "\\.msi$" },
      { label: "Portable, no install", ext: ".exe", pattern: "-portable\\.exe$" },
    ],
  },
  {
    os: "macos",
    name: "macOS",
    detail: "Universal: Apple Silicon and Intel",
    files: [{ label: "Disk image", ext: ".dmg", pattern: "\\.dmg$" }],
  },
  {
    os: "linux",
    name: "Linux",
    detail: "x86_64",
    files: [
      { label: "AppImage", ext: ".AppImage", pattern: "\\.AppImage$" },
      { label: "Debian, Ubuntu", ext: ".deb", pattern: "\\.deb$" },
      { label: "Fedora, openSUSE", ext: ".rpm", pattern: "\\.rpm$" },
    ],
  },
] as const satisfies readonly {
  os: Os;
  name: string;
  detail: string;
  files: readonly { label: string; ext: string; pattern: string }[];
}[];

export const download = {
  title: "Download DiskSieve",
  subtitle: "Free, open source and offline. Pick the file for your system.",
  recommended: "Recommended",
  detected: "Your system",
  checksums: "SHA256SUMS.txt",
  unsignedNote:
    "The installers are not code-signed yet, so Windows and macOS show a warning the first time you open them. Signing is planned for v1.0.",
  steps: {
    windows: "Windows SmartScreen: click “More info”, then “Run anyway”. The portable .exe needs no installation.",
    macos: "macOS: open the app once, then go to System Settings → Privacy & Security and click “Open Anyway”.",
    linux: "Linux: make the AppImage executable (chmod +x) and run it, or install the .deb or .rpm package.",
  },
  verify: {
    title: "Verify your download",
    text: "Every release includes {file}. Compare it with the checksum of the file you downloaded:",
    commands: {
      windows: `Get-FileHash .\\DiskSieve_${release.version}_x64-setup.exe -Algorithm SHA256`,
      unix: `shasum -a 256 DiskSieve_${release.version}_amd64.AppImage`,
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

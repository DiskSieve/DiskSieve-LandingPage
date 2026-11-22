# DiskSieve website

Source of the DiskSieve landing page, served at **https://disksieve.chrubasik.dev**.

The app itself lives in [DiskSieve/disksieve](https://github.com/DiskSieve/disksieve).

## Development

Requires Node.js 22.23.4 or newer.

```sh
npm install
npm run dev      # dev server at http://localhost:4321
npm run check    # Astro and TypeScript checks
npm run lint     # ESLint and Prettier check
npm run format   # format with Prettier
npm run build    # static site in dist/
npm run preview  # serve the built site
```

## Stack

[Astro](https://astro.build) with static output, TypeScript in strict mode and Tailwind CSS v4. Fonts (Geist, JetBrains Mono) are self-hosted. No analytics, no cookies, no third-party scripts or fonts.

## License

The DiskSieve app is MIT-licensed. This website, the DiskSieve logo and branding are © DiskSieve, all rights reserved.

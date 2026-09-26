# khlebov.dev

Personal site of Kirill Khlebov — frontend developer.

React 19 · TypeScript · Vite · CSS Modules · Feature-Sliced Design · prerendered to static HTML.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command                     | What it does                                            |
| --------------------------- | ------------------------------------------------------- |
| `npm run dev`               | Vite dev server                                         |
| `npm run build`             | Typecheck, build, prerender to static HTML in `dist/`   |
| `npm run preview`           | Serve the built site on :4173                           |
| `npm run typecheck`         | `tsc --noEmit`                                          |
| `npm run lint`              | ESLint + Stylelint + steiger (FSD structure)            |
| `npm run format`            | Prettier                                                |
| `npm test`                  | Vitest                                                  |
| `npm run test:coverage`     | Vitest with V8 coverage                                 |
| `npm run e2e`               | Playwright, three viewports, excluding visual tests     |
| `npm run e2e:visual`        | Screenshot comparison (baselines are platform-specific) |
| `npm run e2e:visual:update` | Regenerate those baselines                              |
| `npm run size`              | size-limit budgets                                      |
| `npm run fonts:sync`        | Re-copy the latin font subsets into `public/fonts`      |
| `npm run images:render`     | Re-render `previews/` templates into `public/` images   |

## Editing the content

Everything on the page comes from typed data, not from markup:

- `src/entities/profile/model/profile.ts` — name, role, headline
- `src/entities/project/model/projects.ts` — portfolio cards
- `src/entities/experience/model/experience.ts` — work history
- `src/entities/skill/model/skills.ts` — hard and soft skills
- `src/entities/social/model/socials.ts` — contact links
- `src/shared/config/site.ts` — domain, title, description, email, navigation
- `src/shared/config/tech.ts` — the tech chip registry
- `src/app/styles/tokens.css` — colours, type scale, spacing, motion
- `src/app/styles/breakpoints.css` — the five named breakpoints

`src/shared/config/site.ts` and `tokens.css` are also read at build time: the page
title, description, canonical URL, Open Graph tags, `robots.txt`, `sitemap.xml` and
the inline preloader colours are all generated from them, so no value is written
twice.

## Images

Project screenshots and the Open Graph card are rendered from the HTML templates in
`previews/` by a headless browser and committed as `public/projects/*.webp` and
`public/og.png`. Edit a template, run `npm run images:render`, commit the result.

## Deployment

Cloudflare Pages. Build command `npm run build`, output directory `dist`.
`main` deploys from CI once every check passes; set `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` as secrets and `CLOUDFLARE_PROJECT_NAME` as a repository
variable to enable the job.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for how the project is put together and why.

# Architecture

A single-page portfolio, built to be read as code as much as to be looked at.
Every choice below was made for a reason, and the reason is written down here
rather than in a comment beside the line.

## Rendering: prerendered static, not an SPA shell

`npm run build` runs three steps:

1. `vite build` — the client bundle and `dist/index.html`.
2. `vite build --ssr src/entry-server.tsx` — the same React tree, compiled for Node.
3. `scripts/prerender.mjs` — renders that tree to a string and injects it into
   `dist/index.html`, together with the JSON-LD block.

The result is a real HTML document. A crawler, a link preview, or a browser with
JavaScript switched off all see the full page; `src/main.tsx` then hydrates it.
There is no framework doing this — forty lines of build script is the whole mechanism,
and it stays legible.

## Layers: Feature-Sliced Design, minus `features`

```
src/
├── app/        composition root, global styles, SEO
├── pages/      one page, assembling widgets
├── widgets/    self-contained page sections
├── entities/   domain data and the components that render one item of it
└── shared/     design system, hooks, config - knows nothing about the domain
```

A layer may import from the layers below it and never sideways or up.
`eslint-plugin-boundaries` enforces the direction and the public-API rule, and
`steiger` checks the structure itself, so a violation fails CI rather than review.

There is no `features` layer. A portfolio has no user actions worth isolating,
and an empty layer is worse than a missing one. `steiger.config.ts` turns off
`insignificant-slice` because on a single-page site every widget is used exactly
once by the home page and every entity by exactly one widget — that is the correct
decomposition here, not an accident.

`shared/lib` is grouped by purpose (`classNames`, `date`, `dom`, `href`, `motion`,
`overlay`, `scroll`, `theme`) rather than kept as one flat pile of hooks, which is
what `fsd/shared-lib-grouping` asks for once a slice passes fifteen modules.

Two deliberate simplifications:

- **Tech chips live in `shared`.** Both `project` and `experience` need them.
  Entity-to-entity imports are the messiest part of FSD, so the registry sits in
  `shared/config/tech.ts` and the chip in `shared/ui` — one place, no cross-import.
- **Content is data, not JSX.** `entities/*/model/*.ts` holds typed arrays;
  widgets map over them. Adding a project means adding an object.

## One source for every value

Nothing that appears in two places is typed in two places.

- `src/shared/config/site.ts` holds the URL, title, descriptions, e-mail and
  navigation. `build/siteMeta.ts` is a Vite plugin that fills the `{{token}}`
  placeholders in `index.html` from it and emits `robots.txt` and `sitemap.xml`
  during the client build, so the domain is written exactly once.
- The same plugin reads `--colorBg` and `--colorAccent` out of
  `src/app/styles/tokens.css` for the inline preloader styles. The preloader has to
  paint before the stylesheet loads, so its colours cannot come from a custom
  property — but they no longer have to be copied by hand either, and a missing
  token fails the build.
- Project screenshots are addressed as `/projects/{project.id}.webp`, so the file
  name, the template name in `previews/projects/` and the entity id are the same
  string.
- `src/app/styles/breakpoints.css` defines five `@custom-media` breakpoints and
  every stylesheet uses those names. They were nine ad-hoc pixel values before;
  where two were merged, the merge always rounds up, so a layout only ever
  simplifies earlier, never later.

## State: as little as possible

There is no store and no context. The only cross-cutting state is the theme, and
it lives on `<html data-theme>` — set by an inline script in `index.html` before
first paint, so the page never flashes the wrong colours and the prerendered
markup never mismatches. `themeStore` + `useSyncExternalStore` let React read and
command that attribute without owning it.

Flipping the tokens would re-animate every transition that touches a colour —
shadows and borders on dozens of cards and chips at once, which drops frames and
makes the switcher thumb look like it stutters. `themeStore.set` therefore sets
`data-theme-switching` on the document for one frame; `base.css` kills every
transition under it except on the switcher itself, which carries
`data-theme-transition`.

The scroll spy pins its target on click instead of following the scroll all the way
there: following would walk the highlight through every section on the way, and the
last section is too short to ever reach the top of the viewport. The pin is released
the moment the visitor scrolls, touches or types.

## Styling: CSS Modules over a token layer

`@layer tokens, reset, base, components, utilities` fixes the cascade order up
front, so a component style can never be beaten by a reset. Colours, spacing,
radii, durations and easings are custom properties; the light theme redefines the
same tokens and nothing else. No runtime CSS-in-JS, no utility soup — the CSS ships
at ~6 kB brotlied.

The type scale is fluid: every step is `base + vw` capped at a maximum, so the whole
page grows and stops together instead of each block having its own idea. Headings are
set light — at display sizes weight 300 reads open and large. Only text at
`--textBody` and below takes medium, because a light weight loses presence once the
letters get small.

## Motion: CSS, and nothing else

Reveals, the floating chips, the code bars and the laptop parallax are all CSS
transitions and transforms driven by one `IntersectionObserver` hook. No animation
library is installed, because none is needed for this — that is 0 kB instead of
~35 kB. Everything is disabled under `prefers-reduced-motion`, and the headline
types itself out only when motion is welcome.

The hero illustration is one SVG scene of roughly 1500 nodes with about 130 looping
animations. `usePausedWhenHidden` pauses them through the Web Animations API once the
scene scrolls out of view and resumes them when it comes back, so a visitor reading
the rest of the page is not paying for animation they cannot see. It goes through
`getAnimations()` rather than a CSS class on purpose: a
`.field[data-paused] * { animation-play-state: paused }` rule costs about 60 ms of
style recalculation across a subtree that size, which is most of a frame budget on a
weak machine. Animations that have already finished are left alone, so scrolling back
never replays the fly-in.

Spacing, radii, durations and control sizes come from tokens. Dimensions that belong to
one component and one component only — the switcher track, the social buttons, the logo
mark — stay as literals in that component's stylesheet, because promoting them to global
tokens would claim a shared meaning they do not have.

`body { overflow-x: clip }` exists because the hero scene deliberately paints outside its
box: the sign bands sweep past the viewport edge. The cost is that genuine overflow would
be swallowed just as quietly, so the width sweep is part of reviewing a layout change.

## Images

`npm run images:render` drives a headless Chromium over the templates in `previews/`,
screenshots them at 2× and re-encodes them through a canvas. Project cards become
1600px WebP at quality 0.86 — 216 kB for all three, where the 3000px PNGs they replace
were 1.3 MB — and the Open Graph card becomes a 1200×630 PNG. Every `<img>` carries its
intrinsic width and height, so nothing shifts while they load.

## Navigation and focus

Every nav link is a real anchor, so the browser owns the scrolling. What the browser
does not own is focus: after a fragment navigation it resets focus to `<body>`, which
strands keyboard users at the top of the document. `useFocusOnHash` moves focus to the
section the hash names instead (`tabindex="-1"`, `preventScroll` so it does not fight
the smooth scroll), so tabbing continues from the destination.

The mobile menu is a disclosure, not a modal, so it does not trap focus. It closes when
Escape is pressed, when a pointer lands outside it, or when focus walks out of the panel,
and Escape hands focus back to the burger that opened it.

## Resilience

`ErrorBoundary` wraps the two parts that can fail at runtime without the page having
anything to say about it: the decorative hero scene and the lightbox portal. A crash
in either leaves the rest of the prerendered page intact rather than blanking the
document. The page itself is static HTML, so a failure to hydrate degrades to a
readable site rather than to nothing.

Without JavaScript the intro overlay has nobody to remove it, so a `<noscript>` block
hides it and the prerendered page is simply there. Under `prefers-reduced-motion` the
overlay never shows at all, which would leave the headline empty until hydration — so
`TypedHeadline` renders a settled copy of the headline beside the typed one and CSS
picks the right one from `html.js` and the motion preference. No JavaScript has to run
for the page to read correctly.

`localStorage` access is wrapped — private mode only costs the visitor a remembered
theme. Scroll listeners are throttled to one call per frame. The lightbox traps focus,
restores it on close, closes on Escape, the backdrop or the button, and its zoomed frame
is a real tab stop so the overflow can be scrolled from the keyboard.

`replayAnimation` restarts a CSS animation by taking the class off and putting it back.
Removing the class cancels the running animation, and `animationcancel` is dispatched
_after_ the new class is already on the node — so a cancel handler would strip the
replay it was meant to clean up. Instead each call aborts the previous run's listeners
through an `AbortController`, and a two-frame check removes the class when no animation
started at all, which is what happens under reduced motion where the keyframes are not
declared.

## Fonts

Onest and JetBrains Mono are self-hosted from `public/fonts`, latin subsets only,
synced out of `@fontsource` by `npm run fonts:sync`. The variable Onest file is
preloaded. No third-party request on the critical path.

## The intro overlay

The preloader lives in `index.html` rather than in a component: it has to be painted
with the very first frame, before the stylesheet or any JavaScript has loaded. It
sweeps away on `load`, is held for a minimum of 380 ms so it reads as an intro rather
than a flicker, is capped at 1800 ms in case something never finishes loading, and is
removed from the document afterwards. `useIntroFinished` watches for that removal, so
the headline only starts typing once there is someone to watch it.

## Quality gates

| Gate          | Tool                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| Types         | `tsc --noEmit`, strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`                          |
| Code          | ESLint flat config: typescript-eslint strict-type-checked, react-hooks, jsx-a11y, boundaries, perfectionist |
| Styles        | Stylelint (standard + camelCase module classes)                                                             |
| Structure     | steiger                                                                                                     |
| Units         | Vitest + Testing Library                                                                                    |
| Browser       | Playwright on three viewports                                                                               |
| Accessibility | axe-core through Playwright, in both themes                                                                 |
| Visual        | Playwright screenshots, motion disabled                                                                     |
| Budgets       | Lighthouse CI (≥98 across all four) and size-limit                                                          |

All of it runs on every pull request in `.github/workflows/ci.yml`. The build happens
once, in the first job, and the other jobs download `dist` as an artifact instead of
rebuilding it. `main` deploys to Cloudflare Pages only after the whole matrix is green.

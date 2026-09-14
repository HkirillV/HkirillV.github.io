import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import type { Plugin } from 'vite'

import { absoluteUrl, SITE } from '../src/shared/config/site'

const TOKENS_PATH = fileURLToPath(new URL('../src/app/styles/tokens.css', import.meta.url))

const LIGHT_SELECTOR = "[data-theme='light']"

function readToken(source: string, name: string): string {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(source)

  if (!match?.[1]) throw new Error(`tokens.css defines no --${name}`)

  return match[1].trim()
}

interface Palette {
  bgDark: string
  bgLight: string
  accentDark: string
  accentLight: string
}

export function readPalette(): Palette {
  const source = readFileSync(TOKENS_PATH, 'utf8')
  const splitAt = source.indexOf(LIGHT_SELECTOR)

  if (splitAt === -1) throw new Error(`tokens.css has no ${LIGHT_SELECTOR} block`)

  const dark = source.slice(0, splitAt)
  const light = source.slice(splitAt)

  return {
    bgDark: readToken(dark, 'colorBg'),
    bgLight: readToken(light, 'colorBg'),
    accentDark: readToken(dark, 'colorAccent'),
    accentLight: readToken(light, 'colorAccent'),
  }
}

function values(): Record<string, string> {
  const palette = readPalette()

  return {
    siteUrl: SITE.url,
    siteHome: absoluteUrl('/'),
    siteTitle: SITE.title,
    siteDescription: SITE.description,
    siteSocialDescription: SITE.socialDescription,
    siteOgImage: absoluteUrl(SITE.ogImage),
    siteLocale: SITE.locale,
    colorBgDark: palette.bgDark,
    colorBgLight: palette.bgLight,
    colorAccentDark: palette.accentDark,
    colorAccentLight: palette.accentLight,
  }
}

function fill(template: string, replacements: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = replacements[key]

    if (value === undefined) throw new Error(`index.html asks for an unknown value {{${key}}}`)

    return value
  })
}

function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
}

function sitemap(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${absoluteUrl('/')}</loc>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>',
    '</urlset>',
    '',
  ].join('\n')
}

export function siteMeta(): Plugin {
  let isSsrBuild = false

  return {
    name: 'site-meta',

    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },

    transformIndexHtml: {
      order: 'pre',
      handler: (html) => fill(html, values()),
    },

    generateBundle() {
      if (isSsrBuild) return

      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
    },
  }
}

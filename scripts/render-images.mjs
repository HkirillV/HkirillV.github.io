import { chromium } from '@playwright/test'
import { readdir, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import previewImage from '../src/shared/config/previewImage.json' with { type: 'json' }

const root = fileURLToPath(new URL('..', import.meta.url))

const JOBS = [
  {
    from: 'previews/projects',
    to: 'public/projects',
    viewport: { width: 1500, height: 1088 },
    format: 'webp',
    width: previewImage.width,
    height: previewImage.height,
    quality: previewImage.quality,
  },
  {
    from: 'previews/social',
    to: 'public',
    viewport: { width: 1200, height: 630 },
    format: 'png',
    width: 1200,
  },
]

async function shoot(browser, htmlPath, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 })

  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const png = await page.screenshot({ clip: { x: 0, y: 0, ...viewport } })

  await page.close()

  return png
}

async function encode(browser, png, { format, width, height, quality }) {
  if (width === undefined) return png

  const page = await browser.newPage()

  const { dataUrl, encodedHeight } = await page.evaluate(
    async (options) => {
      const blob = await (await fetch(`data:image/png;base64,${options.source}`)).blob()
      const bitmap = await createImageBitmap(blob)
      const canvas = document.createElement('canvas')

      canvas.width = options.width
      canvas.height = Math.round((options.width * bitmap.height) / bitmap.width)
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)

      return {
        dataUrl: canvas.toDataURL(`image/${options.format}`, options.quality),
        encodedHeight: canvas.height,
      }
    },
    { source: png.toString('base64'), width, quality, format },
  )

  await page.close()

  if (height !== undefined && encodedHeight !== height) {
    throw new Error(
      `previewImage.json says ${width}x${height}, but the template renders ${width}x${encodedHeight}`,
    )
  }

  return Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64')
}

const only = process.argv[2]
const browser = await chromium.launch()
let rendered = 0

for (const job of JOBS) {
  const sourceDir = resolve(root, job.from)
  const templates = (await readdir(sourceDir))
    .filter((name) => name.endsWith('.html'))
    .filter((name) => !only || name.includes(only))

  for (const template of templates) {
    const id = basename(template, '.html')
    const png = await shoot(browser, resolve(sourceDir, template), job.viewport)
    const image = await encode(browser, png, job)
    const target = resolve(root, job.to, `${id}.${job.format}`)

    await writeFile(target, image)
    rendered += 1
    console.log(`rendered ${job.to}/${id}.${job.format} (${(image.length / 1024).toFixed(0)} kB)`)
  }
}

await browser.close()

if (rendered === 0) throw new Error('no preview templates matched')

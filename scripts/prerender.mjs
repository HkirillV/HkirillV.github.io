import { readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templatePath = resolve(root, 'dist/index.html')

const { render } = await import(resolve(root, '.ssr/entry-server.js'))
const { head, html } = render()

const template = await readFile(templatePath, 'utf8')

for (const placeholder of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(placeholder)) {
    throw new Error(`dist/index.html has no ${placeholder} placeholder to fill`)
  }
}

const page = template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html)

await writeFile(templatePath, page)
await rm(resolve(root, '.ssr'), { recursive: true, force: true })

console.log(`prerendered dist/index.html (+${(html.length / 1024).toFixed(1)} kB of markup)`)

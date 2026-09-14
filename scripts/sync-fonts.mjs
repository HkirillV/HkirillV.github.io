import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const target = resolve(root, 'public/fonts')

const FILES = [
  '@fontsource-variable/onest/files/onest-latin-wght-normal.woff2',
  '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
  '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2',
]

await mkdir(target, { recursive: true })

for (const file of FILES) {
  const name = file.split('/').pop()

  await copyFile(resolve(root, 'node_modules', file), resolve(target, name))
  console.log(`synced ${name}`)
}

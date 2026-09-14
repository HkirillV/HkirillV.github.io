import { fileURLToPath } from 'node:url'

import globalData from '@csstools/postcss-global-data'
import customMedia from 'postcss-custom-media'
import nesting from 'postcss-nesting'

const BREAKPOINTS = fileURLToPath(new URL('./src/app/styles/breakpoints.css', import.meta.url))

export default {
  plugins: [globalData({ files: [BREAKPOINTS] }), customMedia(), nesting()],
}

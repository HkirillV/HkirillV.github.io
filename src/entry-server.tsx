import { renderToString } from 'react-dom/server'

import { App, buildPersonJsonLd } from '@/app'

export function render(): { head: string; html: string } {
  return {
    head: `<script type="application/ld+json">${buildPersonJsonLd()}</script>`,
    html: renderToString(<App />),
  }
}

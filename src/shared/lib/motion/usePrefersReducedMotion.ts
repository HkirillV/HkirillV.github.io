import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

let cached: MediaQueryList | null = null

function media(): MediaQueryList {
  cached ??= window.matchMedia(QUERY)

  return cached
}

function subscribe(onChange: () => void): () => void {
  const query = media()

  query.addEventListener('change', onChange)

  return () => {
    query.removeEventListener('change', onChange)
  }
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => media().matches,
    () => false,
  )
}

import { useCallback, useEffect, useState } from 'react'

import { rafThrottle } from '../dom/rafThrottle'

const RELEASE_EVENTS = ['wheel', 'touchmove', 'keydown'] as const

const BOTTOM_TOLERANCE = 2

interface ScrollSpy {
  activeId: string | null
  selectSection: (id: string) => void
}

function sectionUnderOffset(ids: readonly string[], offset: number): string | null {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - BOTTOM_TOLERANCE
  )
    return ids.at(-1) ?? null

  let current: string | null = null

  for (const id of ids) {
    const element = document.getElementById(id)

    if (element && element.getBoundingClientRect().top <= offset) current = id
  }

  return current
}

export function useScrollSpy(ids: readonly string[], offset = 140): ScrollSpy {
  const [scrolledId, setScrolledId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)

  useEffect(() => {
    const update = rafThrottle(() => {
      setScrolledId(sectionUnderOffset(ids, offset))
    })

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      update.cancel()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, offset])

  useEffect(() => {
    if (pinnedId === null) return

    function release(): void {
      setPinnedId(null)
    }

    for (const type of RELEASE_EVENTS) {
      window.addEventListener(type, release, { passive: true })
    }

    return () => {
      for (const type of RELEASE_EVENTS) {
        window.removeEventListener(type, release)
      }
    }
  }, [pinnedId])

  const selectSection = useCallback((id: string) => {
    setPinnedId(id)
  }, [])

  return { activeId: pinnedId ?? scrolledId, selectSection }
}

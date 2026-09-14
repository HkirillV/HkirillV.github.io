import { useEffect } from 'react'

export function useFocusOnHash(ids: readonly string[]): void {
  useEffect(() => {
    function focusTarget(): void {
      const id = window.location.hash.slice(1)

      if (!ids.includes(id)) return

      const target = document.getElementById(id)

      if (!target) return

      target.tabIndex = -1
      target.focus({ preventScroll: true })
    }

    window.addEventListener('hashchange', focusTarget)

    return () => {
      window.removeEventListener('hashchange', focusTarget)
    }
  }, [ids])
}

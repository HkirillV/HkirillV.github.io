import { useEffect } from 'react'

export function useEscapeKey(isActive: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!isActive) return

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') onEscape()
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isActive, onEscape])
}

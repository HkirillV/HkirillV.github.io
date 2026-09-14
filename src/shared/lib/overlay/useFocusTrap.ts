import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap<T extends HTMLElement>(isActive: boolean): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current

    if (!isActive || !container) return

    const restoreTo = document.activeElement instanceof HTMLElement ? document.activeElement : null

    function focusable(): HTMLElement[] {
      return Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    }

    focusable()[0]?.focus()

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key !== 'Tab') return

      const items = focusable()
      const first = items[0]
      const last = items.at(-1)

      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      restoreTo?.focus()
    }
  }, [isActive])

  return ref
}

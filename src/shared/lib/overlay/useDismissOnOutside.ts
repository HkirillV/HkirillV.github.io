import { useEffect, type RefObject } from 'react'

export function useDismissOnOutside(
  refs: readonly RefObject<HTMLElement | null>[],
  isActive: boolean,
  onDismiss: () => void,
): void {
  useEffect(() => {
    if (!isActive) return

    function isInside(target: EventTarget | null): boolean {
      return refs.some((ref) => ref.current?.contains(target as Node | null) === true)
    }

    function dismissFromOutside(event: Event): void {
      if (!isInside(event.target)) onDismiss()
    }

    document.addEventListener('pointerdown', dismissFromOutside)
    document.addEventListener('focusin', dismissFromOutside)

    return () => {
      document.removeEventListener('pointerdown', dismissFromOutside)
      document.removeEventListener('focusin', dismissFromOutside)
    }
  }, [refs, isActive, onDismiss])
}

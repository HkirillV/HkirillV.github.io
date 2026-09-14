import { useEffect, type RefObject } from 'react'

export function usePausedWhenHidden(
  ref: RefObject<Element | null>,
  { isActive, isVisible }: { isActive: boolean; isVisible: boolean },
): void {
  useEffect(() => {
    const host = ref.current

    if (!host || !isActive || isVisible) return
    if (typeof host.getAnimations !== 'function') return

    const paused = host
      .getAnimations({ subtree: true })
      .filter((animation) => animation.playState === 'running')

    for (const animation of paused) animation.pause()

    return () => {
      for (const animation of paused) {
        if (animation.playState === 'paused') animation.play()
      }
    }
  }, [ref, isActive, isVisible])
}

import { useCallback, useEffect, useState } from 'react'

import {
  useInView,
  usePageVisible,
  usePausedWhenHidden,
  usePrefersReducedMotion,
} from '@/shared/lib'

import { VIEW_BOX } from '../../model/deckGeometry'
import { RAIL } from '../../model/deckScene'
import { DeckDefs } from './DeckDefs'
import { DeckFlow } from './DeckFlow'
import { DeckGlass } from './DeckGlass'
import { DeckLaptop } from './DeckLaptop'
import { DeckRail } from './DeckRail'
import { DeckSigns } from './DeckSigns'

import styles from './HeroDeck.module.css'

const REVEAL_THRESHOLD = 0.2

function useRailSlot(isRunning: boolean): { slot: number; shift: (delta: number) => void } {
  const [slot, setSlot] = useState(0)
  const [restart, setRestart] = useState(0)

  useEffect(() => {
    if (!isRunning) return

    const id = window.setInterval(() => {
      setSlot((value) => value + 1)
    }, RAIL.dwell)

    return () => {
      window.clearInterval(id)
    }
  }, [isRunning, restart])

  const shift = useCallback((delta: number) => {
    setSlot((value) => value + delta)
    setRestart((value) => value + 1)
  }, [])

  return { slot, shift }
}

export function HeroDeck() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isPageVisible = usePageVisible()
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: REVEAL_THRESHOLD, once: false })
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (isInView) setIsRevealed(true)
  }, [isInView])

  usePausedWhenHidden(ref, { isActive: isRevealed, isVisible: isInView })

  const { slot, shift } = useRailSlot(!prefersReducedMotion && isInView && isPageVisible)

  return (
    <div className={styles.field} ref={ref} aria-hidden="true">
      <svg className={styles.scene} viewBox={VIEW_BOX} role="presentation" focusable="false">
        <DeckDefs />
        <DeckSigns isRevealed={isRevealed} />
        <DeckLaptop />
        <DeckFlow />
        <DeckGlass />
        <DeckRail slot={slot} onShift={shift} />
      </svg>
    </div>
  )
}

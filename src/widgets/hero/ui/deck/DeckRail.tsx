import { BOX, LID_MATRIX, place } from '../../model/deckGeometry'
import { RAIL, railWindow } from '../../model/deckScene'
import { TechMark } from './TechMark'

import styles from './HeroDeck.module.css'

const BUTTON_INSET = 24
const BUTTON_RADIUS = 16
const CENTRE_Y = 28

interface DeckRailProps {
  slot: number
  onShift: (delta: number) => void
}

export function DeckRail({ slot, onShift }: DeckRailProps) {
  const { w } = BOX.rail

  return (
    <g className={styles.driftSlow}>
      <g transform={place(BOX.rail, LID_MATRIX)}>
        <rect x="5" y="-5" width={w} height={BOX.rail.h} rx="28" className={styles.railCast} />
        <rect width={w} height={BOX.rail.h} rx="28" className={styles.rail} />

        <g clipPath="url(#heroDeckRail)">
          <g className={styles.strip} style={{ transform: `translateX(${-slot * RAIL.step}px)` }}>
            {railWindow(slot).map((item) => (
              <g
                key={item.at}
                transform={`translate(${RAIL.firstX + item.at * RAIL.step} ${CENTRE_Y})`}
              >
                <circle r="15" className={styles.chipDisc} />
                <TechMark id={item.mark} />
              </g>
            ))}
          </g>
        </g>

        <g
          className={styles.railButton}
          onPointerDown={() => {
            onShift(-1)
          }}
        >
          <circle cx={BUTTON_INSET} cy={CENTRE_Y} r={BUTTON_RADIUS} className={styles.railHit} />
          <polygon points="19,28 29,21 29,35" className={styles.railArrow} />
        </g>

        <g
          className={styles.railButton}
          onPointerDown={() => {
            onShift(1)
          }}
        >
          <circle
            cx={w - BUTTON_INSET}
            cy={CENTRE_Y}
            r={BUTTON_RADIUS}
            className={styles.railHit}
          />
          <polygon points={`${w - 19},28 ${w - 29},21 ${w - 29},35`} className={styles.railArrow} />
        </g>
      </g>
    </g>
  )
}

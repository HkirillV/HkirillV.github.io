import type { CSSProperties } from 'react'

import { cn } from '@/shared/lib'

import { BOX, LID_MATRIX, place } from '../../model/deckGeometry'
import { CODE_BAR_HEIGHT, CODE_ROWS } from '../../model/deckScene'

import styles from './HeroDeck.module.css'

export function DeckGlass() {
  return (
    <g className={styles.drift}>
      <g transform={place(BOX.glass, LID_MATRIX)}>
        <rect width={BOX.glass.w} height={BOX.glass.h} rx="15" className={styles.glass} />
        {CODE_ROWS.flatMap((row) =>
          row.bars.map((bar) => (
            <rect
              key={`${row.step}-${bar.x}`}
              x={bar.x}
              y={row.y}
              width={bar.w}
              height={CODE_BAR_HEIGHT}
              rx={CODE_BAR_HEIGHT / 2}
              className={cn(styles.bar, styles[bar.tone])}
              style={{ '--step': row.step } as CSSProperties}
            />
          )),
        )}
      </g>
    </g>
  )
}

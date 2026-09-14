import type { CSSProperties } from 'react'

import { LID_MATRIX, place } from '../../model/deckGeometry'
import { BAND_SCALE, ICON_PATHS, SIGNS, type Sign } from '../../model/deckScene'

import styles from './HeroDeck.module.css'

function SignBand({ sign }: { sign: Sign }) {
  const width = sign.w * BAND_SCALE

  return (
    <rect
      x={sign.side === 'right' ? 0 : -sign.w * (BAND_SCALE - 1)}
      y="0"
      width={width}
      height={sign.h}
      className={sign.side === 'right' ? styles.bandRight : styles.bandLeft}
      style={{ '--slide': `${width / 2}px` } as CSSProperties}
    />
  )
}

function SignContent({ sign }: { sign: Sign }) {
  if (sign.content.kind === 'text') {
    return (
      <text
        x={sign.w / 2}
        y={sign.h / 2}
        className={styles.mark}
        style={{ fontSize: `${sign.content.size}px` }}
      >
        {sign.content.text}
      </text>
    )
  }

  return (
    <path
      d={ICON_PATHS[sign.content.icon]}
      transform={`translate(${sign.w / 2} ${sign.h / 2})`}
      className={styles.icon}
    />
  )
}

export function DeckSigns({ isRevealed }: { isRevealed: boolean }) {
  return (
    <g data-in={isRevealed ? '' : undefined}>
      {SIGNS.map((sign) => (
        <g
          key={sign.key}
          className={styles.sign}
          style={
            {
              '--step': sign.step,
              '--dx': `${sign.dx}px`,
              '--dy': `${sign.dy}px`,
            } as CSSProperties
          }
        >
          <g className={styles.signIdle}>
            <g transform={place(sign, LID_MATRIX)}>
              {sign.band ? <SignBand sign={sign} /> : null}
              <SignContent sign={sign} />
            </g>
          </g>
        </g>
      ))}
    </g>
  )
}

import type { CSSProperties } from 'react'

import { replayAnimation } from '@/shared/lib'

import { BOX, DECK_MATRIX, LID_MATRIX, place } from '../../model/deckGeometry'
import { KEYS } from '../../model/deckScene'

import styles from './HeroDeck.module.css'

function Keyboard() {
  return (
    <g transform={place(BOX.keyboard, DECK_MATRIX)} className={styles.keyboardGroup}>
      <rect width={BOX.keyboard.w} height={BOX.keyboard.h} rx="10" className={styles.keyboard} />
      {KEYS.map((key) => (
        <g key={key.id}>
          <rect
            x={key.x + 1.5}
            y={key.y + 1.5}
            width={key.width}
            height={key.height}
            rx="3"
            className={styles.keyCast}
          />
          <rect
            data-key=""
            x={key.x}
            y={key.y}
            width={key.width}
            height={key.height}
            rx="3"
            className={styles.key}
            style={{ '--delay': `${key.delay}s` } as CSSProperties}
            onPointerDown={(event) => {
              replayAnimation(event.currentTarget, styles.hit)
            }}
          />
        </g>
      ))}
    </g>
  )
}

function Base() {
  return (
    <g transform={place(BOX.deck, DECK_MATRIX)}>
      <rect
        x="10"
        y="10"
        width={BOX.deck.w}
        height={BOX.deck.h}
        rx="20"
        className={styles.deckCast}
      />
      <rect
        x="2.5"
        y="2.5"
        width={BOX.deck.w - 5}
        height={BOX.deck.h - 5}
        rx="17.5"
        className={styles.deck}
      />
      <rect x="100" y="106" width="110" height="55" rx="7" className={styles.pad} />
      <rect x="0" y="0" width={BOX.deck.w} height="36" className={styles.lidShade} />
      <rect x="26" y="2" width={BOX.deck.w - 52} height="13" rx="6.5" className={styles.hinge} />
      <rect x="32" y="3" width={BOX.deck.w - 64} height="3" rx="1.5" className={styles.hingeLit} />
      <path
        d="M 125 177 C 128.5 177 130 168 135 168 L 176 168 C 181 168 182.5 177 186 177 Z"
        className={styles.notch}
      />
    </g>
  )
}

function Screen() {
  return (
    <g transform={place(BOX.screen, LID_MATRIX)}>
      <rect
        x="1"
        y="1"
        width={BOX.screen.w - 2}
        height={BOX.screen.h - 2}
        rx="14"
        className={styles.screen}
      />
      <path
        d="M 110 1 L 110 8 A 4.5 4.5 0 0 0 114.5 12.5 L 157.5 12.5 A 4.5 4.5 0 0 0 162 8 L 162 1 Z"
        className={styles.notchTop}
      />
      <circle cx="136" cy="6.6" r="1.9" className={styles.lens} />
      <circle cx="136" cy="6.6" r="0.8" className={styles.lensGlint} />
    </g>
  )
}

export function DeckLaptop() {
  return (
    <>
      <ellipse
        cx="330"
        cy="500"
        rx="215"
        ry="86"
        fill="url(#heroDeckFloor)"
        className={styles.floor}
      />

      <g transform={place(BOX.deckPlate, DECK_MATRIX)}>
        <rect
          width={BOX.deckPlate.w}
          height={BOX.deckPlate.h}
          rx="20"
          className={styles.deckPlate}
        />
      </g>

      <Base />
      <Keyboard />

      <g transform={place(BOX.lid, LID_MATRIX)}>
        <rect width={BOX.lid.w} height={BOX.lid.h} rx="20" className={styles.lid} />
      </g>

      <ellipse
        cx={BOX.shine.cx}
        cy={BOX.shine.cy}
        rx={BOX.shine.w / 2}
        ry={BOX.shine.h / 2}
        fill="url(#heroDeckShine)"
        className={styles.shine}
      />

      <Screen />
    </>
  )
}

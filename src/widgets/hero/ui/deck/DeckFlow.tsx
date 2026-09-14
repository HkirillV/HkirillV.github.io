import type { CSSProperties } from 'react'

import { BOX, LID_MATRIX, place } from '../../model/deckGeometry'
import { BITS, FLOW_ARROWS, FLOW_BLOCKS, FLOW_LINES, RHOMBUS_STEP } from '../../model/deckScene'

import styles from './HeroDeck.module.css'

function step(value: number): CSSProperties {
  return { '--step': value } as CSSProperties
}

export function DeckFlow() {
  const { rhombus } = BOX

  return (
    <>
      <g transform={place(BOX.bytes, LID_MATRIX)}>
        {BITS.map((row) => (
          <text key={row.text} x="0" y={row.y} className={styles.bits} style={step(row.step)}>
            {row.text}
          </text>
        ))}
      </g>

      {FLOW_LINES.map((line) => (
        <g key={line.key} transform={place(line, LID_MATRIX)}>
          <rect
            width={line.w}
            height={line.h}
            className={styles.flowLine}
            style={step(line.step)}
          />
        </g>
      ))}

      {FLOW_ARROWS.map((arrow) => (
        <g key={arrow.key} transform={place(arrow, LID_MATRIX)}>
          <path
            d={`M ${arrow.w / 2} 0 L ${arrow.w / 2} ${arrow.h}`}
            markerEnd="url(#heroDeckArrow)"
            className={styles.flowArrow}
            style={step(arrow.step)}
          />
        </g>
      ))}

      {FLOW_BLOCKS.map((block) => (
        <g key={block.key} transform={place(block, LID_MATRIX)}>
          <rect
            width={block.w}
            height={block.h}
            rx={block.round ? block.h / 2 : 0}
            className={styles.flowBlock}
            style={step(block.step)}
          />
        </g>
      ))}

      <g transform={place(rhombus, LID_MATRIX)}>
        <polygon
          points={`${rhombus.w / 2},0 ${rhombus.w},${rhombus.h / 2} ${rhombus.w / 2},${rhombus.h} 0,${rhombus.h / 2}`}
          className={styles.flowBlock}
          style={step(RHOMBUS_STEP)}
        />
        <text x={rhombus.w / 2} y={rhombus.h / 2} className={styles.rhombusLabel}>
          &lt;\&gt;
        </text>
      </g>
    </>
  )
}

import { cn } from '@/shared/lib'

import type { MarkId } from '../../model/deckScene'

import styles from './HeroDeck.module.css'

const BADGES = {
  ts: { color: '#3178c6', label: 'TS' },
  js: { color: '#f0db4f', label: 'JS' },
  css: { color: '#2965f1', label: 'CSS' },
  html: { color: '#e34f26', label: '5' },
} as const

type BadgeId = keyof typeof BADGES

function isBadge(id: MarkId): id is BadgeId {
  return id in BADGES
}

export function TechMark({ id }: { id: MarkId }) {
  if (id === 'react') {
    return (
      <g className={styles.markReact}>
        <circle r="2.4" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    )
  }

  if (id === 'webpack') {
    return (
      <g className={styles.markLine}>
        <polygon points="0,-10.5 9,-5.2 9,5.2 0,10.5 -9,5.2 -9,-5.2" />
        <polygon points="0,-5.4 4.7,-2.7 4.7,2.7 0,5.4 -4.7,2.7 -4.7,-2.7" />
      </g>
    )
  }

  if (id === 'vite') {
    return (
      <polygon
        className={styles.markVite}
        points="1.2,-10.5 -6.4,1.2 -0.7,1.2 -2.4,10.5 6.4,-2.4 0,-2.4"
      />
    )
  }

  if (!isBadge(id)) return null

  const badge = BADGES[id]

  return (
    <g>
      <rect x="-9.5" y="-9.5" width="19" height="19" rx="3.5" fill={badge.color} />
      <text className={cn(styles.markLabel, id === 'js' && styles.markLabelDark)} y="0.5">
        {badge.label}
      </text>
    </g>
  )
}

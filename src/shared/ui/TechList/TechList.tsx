import type { CSSProperties } from 'react'

import { TECH, type Tech, type TechId } from '@/shared/config'

import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'

import styles from './TechList.module.css'

interface TechListProps {
  items: readonly TechId[]
  label: string
}

export function TechList({ items, label }: TechListProps) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((id) => {
        const tech: Tech = TECH[id]

        return (
          <li
            key={id}
            className={styles.item}
            style={{ '--techColor': tech.color } as CSSProperties}
          >
            {tech.icon ? (
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill={tech.color}>
                <path d={tech.icon} />
              </svg>
            ) : (
              <span aria-hidden="true">{tech.label}</span>
            )}
            <VisuallyHidden>{tech.title}</VisuallyHidden>
            <span className={styles.tip} aria-hidden="true">
              {tech.title}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

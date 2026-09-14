import type { ReactNode } from 'react'

import styles from './Accent.module.css'

export function Accent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>
}

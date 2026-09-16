import type { Ref } from 'react'

import { cn } from '@/shared/lib'
import { VisuallyHidden } from '@/shared/ui'

import styles from './BurgerButton.module.css'

interface BurgerButtonProps {
  isOpen: boolean
  controls: string
  onToggle: () => void
  ref?: Ref<HTMLButtonElement>
}

export function BurgerButton({ isOpen, controls, onToggle, ref }: BurgerButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(styles.burger, isOpen && styles.open)}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controls}
    >
      <VisuallyHidden>{isOpen ? 'Close menu' : 'Open menu'}</VisuallyHidden>
      <svg className={styles.icon} viewBox="0 0 100 100" aria-hidden="true">
        <path
          className={cn(styles.line, styles.lineTop)}
          d="M 20,29 H 80 C 80,29 94.5,28.8 94.5,66.7 94.5,78 91,81.7 85.3,81.7 79.6,81.7 75,75 75,75 L 25,25"
        />
        <path className={cn(styles.line, styles.lineMiddle)} d="M 20,50 H 80" />
        <path
          className={cn(styles.line, styles.lineBottom)}
          d="M 20,71 H 80 C 80,71 94.5,71.2 94.5,33.3 94.5,22 91,18.3 85.3,18.3 79.6,18.3 75,25 75,25 L 25,75"
        />
      </svg>
    </button>
  )
}

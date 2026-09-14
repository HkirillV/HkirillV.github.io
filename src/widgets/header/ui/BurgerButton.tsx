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
      <span className={styles.line} aria-hidden="true" />
    </button>
  )
}

import type { Ref } from 'react'

import { NAV_ITEMS } from '@/shared/config'
import { cn, useBodyScrollLock } from '@/shared/lib'
import { Container } from '@/shared/ui'

import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  id: string
  isOpen: boolean
  onSelect: (id: string) => void
  ref?: Ref<HTMLDivElement>
}

export function MobileMenu({ id, isOpen, onSelect, ref }: MobileMenuProps) {
  useBodyScrollLock(isOpen)

  return (
    <div ref={ref} id={id} className={cn(styles.menu, isOpen && styles.open)}>
      <Container className={styles.inner}>
        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                className={styles.link}
                href={`#${item.id}`}
                onClick={() => {
                  onSelect(item.id)
                }}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

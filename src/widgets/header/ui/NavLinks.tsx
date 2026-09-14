import { NAV_ITEMS } from '@/shared/config'

import styles from './NavLinks.module.css'

interface NavLinksProps {
  activeId: string | null
  onSelect: (id: string) => void
}

export function NavLinks({ activeId, onSelect }: NavLinksProps) {
  return (
    <nav className={styles.nav} aria-label="Main">
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              className={styles.link}
              href={`#${item.id}`}
              onClick={() => {
                onSelect(item.id)
              }}
              {...(activeId === item.id ? { 'aria-current': 'true' as const } : {})}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

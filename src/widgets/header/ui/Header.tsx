import { useCallback, useMemo, useRef, useState } from 'react'

import { FULL_NAME } from '@/entities/profile'
import { HOME_ID, NAV_IDS } from '@/shared/config'
import {
  cn,
  useDismissOnOutside,
  useEscapeKey,
  useFocusOnHash,
  useScrolledPast,
  useScrollSpy,
} from '@/shared/lib'
import { Container, Logo, VisuallyHidden } from '@/shared/ui'

import { BurgerButton } from './BurgerButton'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'
import { ThemeSwitcher } from './ThemeSwitcher'

import styles from './Header.module.css'

const MOBILE_MENU_ID = 'mobile-menu'
const STUCK_AFTER = 8

export function Header() {
  const { activeId, selectSection } = useScrollSpy(NAV_IDS)
  const isStuck = useScrolledPast(STUCK_AFTER)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)

    const focused = document.activeElement

    if (focused === document.body || menuRef.current?.contains(focused) === true) {
      burgerRef.current?.focus()
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open)
  }, [])

  const selectFromMenu = useCallback(
    (id: string) => {
      selectSection(id)
      closeMenu()
    },
    [selectSection, closeMenu],
  )

  const dismissTargets = useMemo(() => [menuRef, burgerRef], [])

  useEscapeKey(isMenuOpen, closeMenu)
  useDismissOnOutside(dismissTargets, isMenuOpen, closeMenu)
  useFocusOnHash(NAV_IDS)

  return (
    <header className={cn(styles.header, isStuck && styles.stuck)}>
      <Container>
        <div className={styles.inner}>
          <a className={styles.logo} href={`#${HOME_ID}`}>
            <Logo className={styles.logoMark} />
            <VisuallyHidden>{FULL_NAME} — back to top</VisuallyHidden>
          </a>

          <NavLinks activeId={activeId} onSelect={selectSection} />

          <ThemeSwitcher className={styles.switcherSlot} />

          <BurgerButton
            ref={burgerRef}
            isOpen={isMenuOpen}
            controls={MOBILE_MENU_ID}
            onToggle={toggleMenu}
          />
        </div>
      </Container>

      <MobileMenu ref={menuRef} id={MOBILE_MENU_ID} isOpen={isMenuOpen} onSelect={selectFromMenu} />
    </header>
  )
}

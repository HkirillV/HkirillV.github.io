import { cn, useTheme } from '@/shared/lib'
import { MoonIcon, SunIcon, VisuallyHidden } from '@/shared/ui'

import styles from './ThemeSwitcher.module.css'

export function ThemeSwitcher({ className }: { className?: string | undefined }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className={cn(styles.switcher, className)}
      onClick={toggleTheme}
      aria-pressed={isLight}
      title="Switch theme"
    >
      <VisuallyHidden>Switch to {isLight ? 'dark' : 'light'} theme</VisuallyHidden>
      <span data-theme-transition className={cn(styles.thumb, isLight && styles.thumbLight)} />
      <MoonIcon className={cn(styles.moon, !isLight && styles.iconOnThumb)} />
      <SunIcon className={cn(styles.sun, isLight && styles.iconOnThumb)} />
    </button>
  )
}

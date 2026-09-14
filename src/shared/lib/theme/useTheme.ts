import { useCallback, useSyncExternalStore } from 'react'

import { themeStore, type Theme } from './themeStore'

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  )

  const toggleTheme = useCallback(() => {
    themeStore.toggle()
  }, [])

  return { theme, toggleTheme }
}

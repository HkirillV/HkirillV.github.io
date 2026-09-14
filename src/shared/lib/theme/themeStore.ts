export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'kh-theme'
const listeners = new Set<() => void>()

function readFromDocument(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function notify(): void {
  for (const listener of listeners) listener()
}

function suppressTransitions(root: HTMLElement): void {
  root.dataset.themeSwitching = ''

  if (typeof requestAnimationFrame !== 'function') {
    delete root.dataset.themeSwitching
    return
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      delete root.dataset.themeSwitching
    })
  })
}

function remember(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    return
  }
}

export const themeStore = {
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  },

  getSnapshot: (): Theme => readFromDocument(),

  getServerSnapshot: (): Theme => 'dark',

  set: (theme: Theme): void => {
    const root = document.documentElement

    suppressTransitions(root)
    root.dataset.theme = theme
    remember(theme)
    notify()
  },

  toggle: (): Theme => {
    const next: Theme = readFromDocument() === 'light' ? 'dark' : 'light'

    themeStore.set(next)

    return next
  },
}

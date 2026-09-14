import { beforeEach, describe, expect, it, vi } from 'vitest'

import { themeStore } from './themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
    localStorage.clear()
  })

  it('treats the document as the source of truth', () => {
    expect(themeStore.getSnapshot()).toBe('dark')

    document.documentElement.dataset.theme = 'light'

    expect(themeStore.getSnapshot()).toBe('light')
  })

  it('renders dark on the server, matching the prerendered markup', () => {
    expect(themeStore.getServerSnapshot()).toBe('dark')
  })

  it('writes the choice to the document and to storage', () => {
    themeStore.set('light')

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('kh-theme')).toBe('light')
  })

  it('notifies subscribers on every change', () => {
    const listener = vi.fn()
    const unsubscribe = themeStore.subscribe(listener)

    themeStore.toggle()
    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    themeStore.toggle()
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('freezes transitions for the frame in which the tokens swap', () => {
    themeStore.set('light')

    expect(document.documentElement.dataset.themeSwitching).toBe('')
  })

  it('toggles between the two themes', () => {
    expect(themeStore.toggle()).toBe('light')
    expect(themeStore.toggle()).toBe('dark')
  })

  it('survives storage being unavailable', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => {
      themeStore.set('light')
    }).not.toThrow()
    expect(document.documentElement.dataset.theme).toBe('light')

    setItem.mockRestore()
  })
})

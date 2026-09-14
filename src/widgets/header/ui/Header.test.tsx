import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { NAV_ITEMS } from '@/shared/config'

import { Header } from './Header'

describe('Header', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
    localStorage.clear()
  })

  it('renders every navigation entry as an in-page link', () => {
    render(<Header />)

    const nav = within(screen.getByRole('navigation', { name: 'Main' }))

    for (const item of NAV_ITEMS) {
      expect(nav.getByRole('link', { name: item.label })).toHaveAttribute('href', `#${item.id}`)
    }
  })

  it('marks a clicked section as current straight away, without walking through the others', async () => {
    const user = userEvent.setup()

    render(<Header />)

    const nav = within(screen.getByRole('navigation', { name: 'Main' }))

    await user.click(nav.getByRole('link', { name: 'Skills' }))

    expect(nav.getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'true')
    expect(nav.getByRole('link', { name: 'Portfolio' })).not.toHaveAttribute('aria-current')
  })

  it('keeps the collapsed mobile menu out of the tab order', () => {
    render(<Header />)

    const mobileLinks = screen
      .getAllByRole('link', { name: 'About' })
      .filter((link) => link.getAttribute('tabindex') === '-1')

    expect(mobileLinks).toHaveLength(1)
  })

  it('switches the theme on the document and remembers the choice', async () => {
    const user = userEvent.setup()

    render(<Header />)

    await user.click(screen.getByRole('button', { name: /switch to light theme/i }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('kh-theme')).toBe('light')
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('closes the menu when a pointer lands outside it', async () => {
    const user = userEvent.setup()

    render(<Header />)

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.click(document.body)

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('hands focus back to the burger when Escape closes the menu', async () => {
    const user = userEvent.setup()

    render(<Header />)

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveFocus()
  })

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()

    render(<Header />)

    const burger = screen.getByRole('button', { name: /open menu/i })

    expect(burger).toHaveAttribute('aria-expanded', 'false')

    await user.click(burger)

    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})

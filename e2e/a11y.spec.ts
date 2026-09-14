import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const THEMES = ['dark', 'light'] as const

for (const theme of THEMES) {
  test(`has no accessibility violations in the ${theme} theme`, async ({ page }) => {
    await page.addInitScript((value) => {
      window.localStorage.setItem('kh-theme', value)
    }, theme)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
}

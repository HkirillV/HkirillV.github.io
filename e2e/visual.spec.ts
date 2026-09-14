import { expect, test } from '@playwright/test'

for (const theme of ['dark', 'light'] as const) {
  test(`looks unchanged in the ${theme} theme @visual`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: theme })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot(`${testInfo.project.name}-${theme}.png`, {
      fullPage: true,
    })
  })
}

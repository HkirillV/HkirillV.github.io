import { expect, test } from '@playwright/test'

import { FULL_NAME } from '@/entities/profile'
import { NAV_IDS, SITE } from '@/shared/config'

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('ships real markup before JavaScript runs', async ({ request }) => {
    const response = await request.get('/')
    const html = await response.text()

    expect(html).toContain(FULL_NAME)
    expect(html).toContain('Work Experience')
    expect(html).toContain('"@type":"Person"')
  })

  test('shows the headline and every section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(FULL_NAME)

    for (const id of NAV_IDS) {
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
  })

  test('lists the projects and the work history', async ({ page }) => {
    await expect(page.locator('#portfolio article')).toHaveCount(3)
    await expect(page.locator('#work-experience article')).toHaveCount(4)
  })

  test('follows the operating system colour scheme until a choice is made', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('remembers the chosen theme across a reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')

    const html = page.locator('html')

    await expect(html).toHaveAttribute('data-theme', 'dark')

    await page.getByRole('button', { name: /switch to light theme/i }).click()
    await expect(html).toHaveAttribute('data-theme', 'light')

    await page.reload()
    await expect(html).toHaveAttribute('data-theme', 'light')
  })

  test('scrolls to contacts from the hero call to action', async ({ page }) => {
    await page.getByRole('link', { name: /let’s check!/i }).click()

    await expect(page).toHaveURL(/#contacts$/)
    await expect(page.getByRole('link', { name: SITE.email })).toBeInViewport()
  })

  test('opens a project screenshot in the lightbox and closes it with Escape', async ({ page }) => {
    await page
      .getByRole('button', { name: /open full-size screenshot/i })
      .first()
      .click()

    const dialog = page.getByRole('dialog')

    await expect(dialog).toBeVisible()
    await expect(page.getByRole('button', { name: 'Zoom in' })).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused()

    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Zoom in' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('keeps the zoomed screenshot undistorted and reachable by keyboard', async ({ page }) => {
    await page
      .getByRole('button', { name: /open full-size screenshot/i })
      .first()
      .click()
    await page.getByRole('button', { name: 'Zoom in' }).click()

    const image = page.locator('[role="dialog"] img')
    const box = await image.boundingBox()
    const natural = await image.evaluate((node: HTMLImageElement) => ({
      width: node.naturalWidth,
      height: node.naturalHeight,
    }))

    expect(box).not.toBeNull()
    expect(box!.width / box!.height).toBeCloseTo(natural.width / natural.height, 2)

    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    await expect(page.getByRole('group', { name: /scrollable/i })).toBeFocused()
  })

  test('gives every navigation target a heading of its own', async ({ page }) => {
    for (const name of ['My Skills', 'My Portfolio', 'Work Experience']) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible()
    }

    await expect(
      page.getByRole('heading', { level: 2, name: /something interesting/i }),
    ).toBeVisible()
  })

  test('is operable with the keyboard alone', async ({ page }) => {
    await page.keyboard.press('Tab')

    await expect(page.getByRole('link', { name: new RegExp(FULL_NAME, 'i') }).first()).toBeFocused()
  })
})

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('moves focus to the section a menu item points at', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /open menu/i }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Skills' }).click()

    await expect(page.locator('#skills')).toBeFocused()
  })

  test('hands focus back to the burger when Escape closes the menu', async ({ page }) => {
    await page.goto('/')

    const burger = page.getByRole('button', { name: /open menu/i })

    await burger.click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Skills' }).focus()
    await page.keyboard.press('Escape')

    await expect(page.getByRole('button', { name: /open menu/i })).toBeFocused()
  })

  test('closes itself when focus walks out of the panel', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /open menu/i }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Contacts' }).focus()
    await page.keyboard.press('Tab')

    await expect(page.locator('button[aria-controls="mobile-menu"]')).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})

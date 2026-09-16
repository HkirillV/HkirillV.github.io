export const SITE = {
  url: 'https://kirillkhlebov.ru',
  title: 'Kirill Khlebov — Frontend Developer',
  description:
    'Kirill Khlebov, frontend developer at Sber. React, TypeScript and interfaces built around AI products.',
  socialDescription:
    'React, TypeScript and interfaces built around AI products. Frontend developer at Sber.',
  ogImage: '/og.png',
  locale: 'en',
  email: 'khlebov79@gmail.com',
  availability: 'mon-fri from 8 am to 8 pm (msk)',
  copyrightYear: 2026,
} as const

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'work-experience', label: 'Work Experience' },
  { id: 'contacts', label: 'Contacts' },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]

export const HOME_ID = NAV_ITEMS[0].id

export const NAV_IDS = NAV_ITEMS.map((item) => item.id)

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href
}

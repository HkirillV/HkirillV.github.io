import type { TechId } from '@/shared/config'
import { currentMonth, monthsBetween } from '@/shared/lib'

export interface ExperienceEntry {
  readonly id: string
  readonly company: string
  readonly companyUrl: string
  readonly position: string
  readonly startedAt: string
  readonly endedAt: string | null
  readonly summary: string
  readonly stack: readonly TechId[]
}

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'sber-ai',
    company: 'Sber',
    companyUrl: 'https://sber.ru',
    position: 'Frontend Developer',
    startedAt: '2026-03',
    endedAt: null,
    summary:
      'Frontend for AI products: streaming chat surfaces, evaluation and annotation tooling, and the shared component library four teams build on.',
    stack: ['ts', 'react', 'rtk', 'query', 'vite'],
  },
  {
    id: 'product-company',
    company: 'Beeline',
    companyUrl: 'https://beeline.ru',
    position: 'Frontend Developer',
    startedAt: '2022-04',
    endedAt: '2026-02',
    summary:
      'Feature work in a large customer-facing product, migration of the build from Webpack to Vite, and a measurable cut in first-load time.',
    stack: ['ts', 'react', 'redux', 'webpack'],
  },
  {
    id: 'digital-studio',
    company: 'Digital Studio',
    companyUrl: 'https://github.com/khlebov',
    position: 'Frontend Developer',
    startedAt: '2020-11',
    endedAt: '2022-03',
    summary:
      'Client sites, landing pages and admin dashboards delivered end to end — from Figma to release, often as the only frontend on the project.',
    stack: ['js', 'react', 'scss', 'html'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    companyUrl: 'https://github.com/khlebov',
    position: 'Frontend Developer',
    startedAt: '2019-06',
    endedAt: '2020-09',
    summary:
      'Where it started: layouts, small shops and CMS integrations. Learned to talk to clients and to ship on a date I promised myself.',
    stack: ['html', 'css', 'js', 'git'],
  },
]

export function totalExperienceMonths(
  entries: readonly ExperienceEntry[] = EXPERIENCE,
  now: Date = new Date(),
): number {
  const today = currentMonth(now)

  return entries.reduce(
    (total, entry) => total + monthsBetween(entry.startedAt, entry.endedAt ?? today),
    0,
  )
}

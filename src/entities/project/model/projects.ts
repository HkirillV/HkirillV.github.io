import type { TechId } from '@/shared/config'

export interface Project {
  readonly id: string
  readonly title: string
  readonly releasedAt: string
  readonly description: string
  readonly url: string
  readonly stack: readonly TechId[]
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'service-hub',
    title: 'Service Hub',
    releasedAt: '2025-06',
    description:
      'Unified ticketing platform for support, field engineers and the call centre, replacing email and spreadsheets. SLA timers auto-escalate overdue requests.',
    url: 'https://beeline.ru',
    stack: ['ts', 'react', 'redux', 'query', 'sse'],
  },
  {
    id: 'prism-console',
    title: 'Prism Console',
    releasedAt: '2025-02',
    description:
      'Internal evaluation console for AI products: compare model outputs side by side, diff regressions before release, and score responses against a rubric. Used by 6 product squads, cutting manual QA time in half.',
    url: 'https://github.com/khlebov',
    stack: ['ts', 'next', 'zustand', 'query', 'vitest'],
  },
  {
    id: 'atlas-design-system',
    title: 'Atlas Design System',
    releasedAt: '2023-11',
    description:
      'Foundational component library and token system versioned as a package. Powers every internal product surface across 9 teams, with full theming, accessibility audits, and a living documentation site.',
    url: 'https://github.com/khlebov',
    stack: ['ts', 'react', 'storybook', 'css', 'a11y'],
  },
]

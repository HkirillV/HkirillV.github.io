import type { TechId } from '@/shared/config'

export interface Project {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly url: string
  readonly stack: readonly TechId[]
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'service-hub',
    title: 'Service Hub',
    description: 'Unified ticketing platform for support, field engineers and the call center.',
    url: 'https://beeline.ru',
    stack: ['ts', 'react', 'redux', 'query', 'sse'],
  },
  {
    id: 'prism-console',
    title: 'Prism Console',
    description:
      'Internal console for comparing model outputs side by side and scoring them against a rubric.',
    url: 'https://github.com/khlebov',
    stack: ['ts', 'next', 'zustand', 'query', 'vitest'],
  },
  {
    id: 'atlas-design-system',
    title: 'Atlas Design System',
    description:
      'Component library and token system versioned as a package, with theming and accessibility built in.',
    url: 'https://github.com/khlebov',
    stack: ['ts', 'react', 'storybook', 'css', 'a11y'],
  },
]

import type { TypingStage } from '@/shared/lib'

export interface Company {
  readonly name: string
  readonly url: string
}

export interface Profile {
  readonly firstName: string
  readonly lastName: string
  readonly role: string
  readonly company: Company
  readonly location: string
  readonly summary: string
  readonly level: string
  readonly projectsShipped: number
}

export const PROFILE: Profile = {
  firstName: 'Kirill',
  lastName: 'Khlebov',
  role: 'Frontend Developer',
  company: { name: 'Sber', url: 'https://sber.ru' },
  location: 'Moscow, Russia',
  summary:
    'I build the interface layer of AI products — streaming answers, long-running jobs and the tooling teams use to evaluate them.',
  level: 'Middle+',
  projectsShipped: 20,
}

export const FULL_NAME = `${PROFILE.firstName} ${PROFILE.lastName}`

export const HERO_STAGES: readonly TypingStage[] = [
  { text: `Hello! My name is\n${FULL_NAME}.`, keep: true, accent: [0, 6] },
  { text: 'I am a frontend\ndeveloper.', keep: false },
  { text: 'I build interfaces for\nAI products.', keep: true, accent: [23, 34] },
]

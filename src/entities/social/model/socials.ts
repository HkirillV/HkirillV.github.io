import { SITE } from '@/shared/config'

export type SocialId = 'github' | 'telegram' | 'linkedin' | 'email'

export interface Social {
  readonly id: SocialId
  readonly label: string
  readonly href: string
}

export const SOCIALS: readonly Social[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/HkirillV' },
  { id: 'telegram', label: '@khlebov79', href: 'https://t.me/khlebov79' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { id: 'email', label: SITE.email, href: `mailto:${SITE.email}` },
]

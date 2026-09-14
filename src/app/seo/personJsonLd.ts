import { EXPERIENCE } from '@/entities/experience'
import { FULL_NAME, PROFILE } from '@/entities/profile'
import { SOCIALS } from '@/entities/social'
import { absoluteUrl, SITE } from '@/shared/config'
import { isExternalHref } from '@/shared/lib'

export function buildPersonJsonLd(): string {
  const current = EXPERIENCE[0]

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: FULL_NAME,
    givenName: PROFILE.firstName,
    familyName: PROFILE.lastName,
    jobTitle: PROFILE.role,
    description: PROFILE.summary,
    email: `mailto:${SITE.email}`,
    url: SITE.url,
    image: absoluteUrl(SITE.ogImage),
    ...(current
      ? { worksFor: { '@type': 'Organization', name: current.company, url: current.companyUrl } }
      : {}),
    sameAs: SOCIALS.filter((social) => isExternalHref(social.href)).map((social) => social.href),
  })
}

export const EXTERNAL_LINK_PROPS = { target: '_blank', rel: 'noreferrer noopener' } as const

export function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

export function externalLinkProps(href: string): Partial<typeof EXTERNAL_LINK_PROPS> {
  return isExternalHref(href) ? EXTERNAL_LINK_PROPS : {}
}

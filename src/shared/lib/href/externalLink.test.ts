import { describe, expect, it } from 'vitest'

import { EXTERNAL_LINK_PROPS, externalLinkProps, isExternalHref } from './externalLink'

describe('isExternalHref', () => {
  it('treats http and https links as external', () => {
    expect(isExternalHref('https://github.com/khlebov')).toBe(true)
    expect(isExternalHref('http://example.com')).toBe(true)
  })

  it('treats mailto and in-page links as internal', () => {
    expect(isExternalHref('mailto:hi@example.com')).toBe(false)
    expect(isExternalHref('#contacts')).toBe(false)
    expect(isExternalHref('/projects/service-hub.webp')).toBe(false)
  })
})

describe('externalLinkProps', () => {
  it('opens external links in a new tab without handing over the opener', () => {
    expect(externalLinkProps('https://sber.ru')).toEqual(EXTERNAL_LINK_PROPS)
    expect(EXTERNAL_LINK_PROPS.rel).toContain('noopener')
  })

  it('leaves internal links alone', () => {
    expect(externalLinkProps('mailto:hi@example.com')).toEqual({})
  })
})

import { describe, expect, it } from 'vitest'

import { formatMonth } from './formatMonth'

describe('formatMonth', () => {
  it('renders an ISO year-month as a readable date', () => {
    expect(formatMonth('2025-06')).toBe('June 2025')
  })

  it('does not drift across time zones', () => {
    expect(formatMonth('2024-01')).toBe('January 2024')
    expect(formatMonth('2024-12')).toBe('December 2024')
  })
})

import { describe, expect, it } from 'vitest'

import { currentMonth, formatDuration, monthsBetween, wholeYears } from './duration'

describe('monthsBetween', () => {
  it('counts both the first and the last month', () => {
    expect(monthsBetween('2024-01', '2024-01')).toBe(1)
    expect(monthsBetween('2024-01', '2024-12')).toBe(12)
  })

  it('spans years', () => {
    expect(monthsBetween('2019-06', '2020-09')).toBe(16)
  })

  it('never goes negative', () => {
    expect(monthsBetween('2024-06', '2024-01')).toBe(0)
  })

  it('returns zero for an unparsable month', () => {
    expect(monthsBetween('nope', '2024-01')).toBe(0)
  })
})

describe('currentMonth', () => {
  it('pads the month to two digits', () => {
    expect(currentMonth(new Date('2026-03-14T00:00:00Z'))).toBe('2026-03')
    expect(currentMonth(new Date('2026-11-01T00:00:00Z'))).toBe('2026-11')
  })
})

describe('formatDuration', () => {
  it('reads as a human would say it', () => {
    expect(formatDuration(8)).toBe('8 months')
    expect(formatDuration(1)).toBe('1 month')
    expect(formatDuration(24)).toBe('2 years')
    expect(formatDuration(12)).toBe('1 year')
    expect(formatDuration(88)).toBe('7 years 4 months')
  })
})

describe('wholeYears', () => {
  it('drops the remaining months', () => {
    expect(wholeYears(88)).toBe(7)
    expect(wholeYears(11)).toBe(0)
  })
})

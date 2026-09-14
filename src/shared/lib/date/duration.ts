const MONTHS_IN_YEAR = 12

function monthIndex(isoMonth: string): number {
  const date = new Date(`${isoMonth}-01T00:00:00Z`)

  return Number.isNaN(date.getTime())
    ? Number.NaN
    : date.getUTCFullYear() * MONTHS_IN_YEAR + date.getUTCMonth()
}

export function currentMonth(now: Date = new Date()): string {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
}

export function monthsBetween(startIso: string, endIso: string): number {
  const start = monthIndex(startIso)
  const end = monthIndex(endIso)

  if (Number.isNaN(start) || Number.isNaN(end)) return 0

  return Math.max(0, end - start + 1)
}

export function wholeYears(months: number): number {
  return Math.floor(months / MONTHS_IN_YEAR)
}

function plural(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? '' : 's'}`
}

export function formatDuration(months: number): string {
  const years = wholeYears(months)
  const rest = months % MONTHS_IN_YEAR

  if (years === 0) return plural(rest, 'month')
  if (rest === 0) return plural(years, 'year')

  return `${plural(years, 'year')} ${plural(rest, 'month')}`
}

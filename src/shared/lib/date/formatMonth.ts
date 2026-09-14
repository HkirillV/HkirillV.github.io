const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatMonth(isoMonth: string): string {
  const date = new Date(`${isoMonth}-01T00:00:00Z`)

  return Number.isNaN(date.getTime()) ? isoMonth : formatter.format(date)
}

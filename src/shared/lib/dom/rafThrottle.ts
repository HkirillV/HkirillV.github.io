interface Throttled<T extends unknown[]> {
  (...args: T): void
  cancel: () => void
}

export function rafThrottle<T extends unknown[]>(callback: (...args: T) => void): Throttled<T> {
  let frame: number | null = null
  let latest: T | null = null

  function run(): void {
    frame = null

    if (latest) callback(...latest)
  }

  const throttled = (...args: T): void => {
    latest = args
    frame ??= requestAnimationFrame(run)
  }

  throttled.cancel = (): void => {
    if (frame !== null) cancelAnimationFrame(frame)

    frame = null
    latest = null
  }

  return throttled
}

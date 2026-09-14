import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { rafThrottle } from './rafThrottle'

describe('rafThrottle', () => {
  let frames: (() => void)[] = []

  beforeEach(() => {
    frames = []
    vi.stubGlobal('requestAnimationFrame', (callback: () => void) => {
      frames.push(callback)

      return frames.length
    })
    vi.stubGlobal('cancelAnimationFrame', (handle: number) => {
      frames[handle - 1] = () => undefined
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function flush(): void {
    const pending = frames
    frames = []
    for (const frame of pending) frame()
  }

  it('collapses a burst of calls into a single frame', () => {
    const spy = vi.fn()
    const throttled = rafThrottle(spy)

    throttled()
    throttled()
    throttled()

    expect(spy).not.toHaveBeenCalled()

    flush()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('passes the arguments of the most recent call', () => {
    const spy = vi.fn()
    const throttled = rafThrottle(spy)

    throttled('first')
    throttled('second')
    flush()

    expect(spy).toHaveBeenCalledWith('second')
  })

  it('schedules a new frame once the previous one has run', () => {
    const spy = vi.fn()
    const throttled = rafThrottle(spy)

    throttled()
    flush()
    throttled()
    flush()

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('drops the pending call when cancelled', () => {
    const spy = vi.fn()
    const throttled = rafThrottle(spy)

    throttled()
    throttled.cancel()
    flush()

    expect(spy).not.toHaveBeenCalled()
  })
})

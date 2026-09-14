import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { resolveLines, TYPING_SPEED, useLiveTyping, type TypingStage } from './useLiveTyping'

const STAGES: readonly TypingStage[] = [
  { text: 'Hi.', keep: true, accent: [0, 2] },
  { text: 'Erased.', keep: false },
  { text: 'Done.', keep: true },
]

describe('resolveLines', () => {
  it('shows the stage being typed, cut to the cursor', () => {
    expect(resolveLines(STAGES, { stage: 0, chars: 2, isErasing: false })).toEqual([
      { text: 'Hi', accent: [0, 2], isTyping: true },
    ])
  })

  it('keeps finished stages that are marked keep and drops the rest', () => {
    const lines = resolveLines(STAGES, { stage: 2, chars: 4, isErasing: false })

    expect(lines.map((line) => line.text)).toEqual(['Hi.', 'Done'])
  })

  it('returns only the kept lines once every stage is done', () => {
    const lines = resolveLines(STAGES, { stage: 3, chars: 0, isErasing: false })

    expect(lines.map((line) => line.text)).toEqual(['Hi.', 'Done.'])
  })
})

describe('useLiveTyping', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('types the first stage out one character at a time', () => {
    const { result } = renderHook(() => useLiveTyping(STAGES))

    expect(result.current.lines[0]?.text).toBe('')

    act(() => {
      vi.advanceTimersByTime(TYPING_SPEED.type)
    })
    expect(result.current.lines[0]?.text).toBe('H')

    act(() => {
      vi.advanceTimersByTime(TYPING_SPEED.type)
    })
    expect(result.current.lines[0]?.text).toBe('Hi')
  })

  it('erases a stage that is not kept and never leaves it on screen', () => {
    const { result } = renderHook(() => useLiveTyping(STAGES))

    for (let step = 0; step < 100 && !result.current.isDone; step += 1) {
      act(() => {
        vi.advanceTimersByTime(1000)
      })
    }

    expect(result.current.isDone).toBe(true)
    expect(result.current.lines.map((line) => line.text)).toEqual(['Hi.', 'Done.'])
  })

  it('clears its timer on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const { unmount } = renderHook(() => useLiveTyping(STAGES))

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})

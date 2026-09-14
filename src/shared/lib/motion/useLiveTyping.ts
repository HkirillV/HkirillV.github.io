import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface TypingStage {
  readonly text: string
  readonly keep: boolean
  readonly accent?: readonly [number, number]
}

export interface TypedLine {
  readonly text: string
  readonly accent: readonly [number, number] | undefined
  readonly isTyping: boolean
}

interface Cursor {
  readonly stage: number
  readonly chars: number
  readonly isErasing: boolean
}

export const TYPING_SPEED = {
  type: 75,
  erase: 34,
  hold: 2200,
  switch: 550,
} as const

const START: Cursor = { stage: 0, chars: 0, isErasing: false }

export function settledLines(stages: readonly TypingStage[]): TypedLine[] {
  return stages
    .filter((stage) => stage.keep)
    .map((stage) => ({ text: stage.text, accent: stage.accent, isTyping: false }))
}

export function resolveLines(stages: readonly TypingStage[], cursor: Cursor): TypedLine[] {
  const kept = settledLines(stages.slice(0, cursor.stage))
  const active = stages[cursor.stage]

  if (!active) return kept

  return [
    ...kept,
    { text: active.text.slice(0, cursor.chars), accent: active.accent, isTyping: true },
  ]
}

function nextCursor(stage: TypingStage, cursor: Cursor): [Cursor, number] {
  if (cursor.isErasing) {
    return cursor.chars > 0
      ? [{ ...cursor, chars: cursor.chars - 1 }, TYPING_SPEED.erase]
      : [{ stage: cursor.stage + 1, chars: 0, isErasing: false }, TYPING_SPEED.switch]
  }

  if (cursor.chars < stage.text.length) {
    return [{ ...cursor, chars: cursor.chars + 1 }, TYPING_SPEED.type]
  }

  return stage.keep
    ? [{ stage: cursor.stage + 1, chars: 0, isErasing: false }, TYPING_SPEED.switch]
    : [{ ...cursor, isErasing: true }, TYPING_SPEED.hold]
}

export function useLiveTyping(
  stages: readonly TypingStage[],
  { enabled = true }: { enabled?: boolean } = {},
): { lines: TypedLine[]; isDone: boolean } {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [cursor, setCursor] = useState<Cursor>(START)

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return

    const stage = stages[cursor.stage]

    if (!stage) return

    const [next, delay] = nextCursor(stage, cursor)
    const timer = setTimeout(() => {
      setCursor(next)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [cursor, enabled, prefersReducedMotion, stages])

  if (prefersReducedMotion) return { lines: settledLines(stages), isDone: true }

  return { lines: resolveLines(stages, cursor), isDone: cursor.stage >= stages.length }
}

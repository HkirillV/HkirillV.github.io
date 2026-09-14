import { Fragment, type ReactNode } from 'react'

import { settledLines, type TypedLine, type TypingStage } from '@/shared/lib'
import { Accent, VisuallyHidden } from '@/shared/ui'

import styles from './TypedHeadline.module.css'

function withBreaks(text: string): ReactNode[] {
  return text.split('\n').map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {part}
    </Fragment>
  ))
}

function splitAtAccent(line: TypedLine): [string, string, string] {
  const { text, accent } = line

  if (!accent) return [text, '', '']

  const from = Math.min(text.length, accent[0])
  const to = Math.min(text.length, accent[1])

  return [text.slice(0, from), text.slice(from, to), text.slice(to)]
}

function TypedText({ line, withCaret }: { line: TypedLine; withCaret: boolean }) {
  const [before, accented, after] = splitAtAccent(line)

  return (
    <span className={styles.line}>
      {withBreaks(before)}
      {accented ? <Accent>{withBreaks(accented)}</Accent> : null}
      {withBreaks(after)}
      {withCaret ? <span className={styles.caret} /> : null}
    </span>
  )
}

function spoken(stages: readonly TypingStage[]): string {
  return settledLines(stages)
    .map((line) => line.text.replace(/\n/g, ' '))
    .join(' ')
}

interface TypedHeadlineProps {
  stages: readonly TypingStage[]
  lines: readonly TypedLine[]
  isDone: boolean
}

export function TypedHeadline({ stages, lines, isDone }: TypedHeadlineProps) {
  return (
    <h1 className={styles.headline}>
      <VisuallyHidden>{spoken(stages)}</VisuallyHidden>

      <span className={styles.settled} aria-hidden="true">
        {settledLines(stages).map((line, index) => (
          <TypedText key={index} line={line} withCaret={false} />
        ))}
      </span>

      <span className={styles.typed} aria-hidden="true">
        {lines.map((line, index) => (
          <TypedText key={index} line={line} withCaret={!isDone && index === lines.length - 1} />
        ))}
      </span>
    </h1>
  )
}

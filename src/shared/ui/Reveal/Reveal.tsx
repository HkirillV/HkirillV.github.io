import type { CSSProperties, ElementType, ReactNode } from 'react'

import { cn, useInView, useIntroFinished } from '@/shared/lib'

interface RevealProps {
  children: ReactNode
  delay?: number | undefined
  as?: ElementType | undefined
  className?: string | undefined
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const { ref, isInView } = useInView<HTMLElement>()
  const isIntroFinished = useIntroFinished()

  return (
    <Tag
      ref={ref}
      className={cn('reveal', isInView && isIntroFinished && 'revealVisible', className)}
      style={delay ? ({ '--revealDelay': `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}

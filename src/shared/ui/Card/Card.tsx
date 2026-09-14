import type { ElementType, ReactNode } from 'react'

import { cn } from '@/shared/lib'

import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  as?: ElementType
  hoverable?: boolean | undefined
  className?: string | undefined
}

export function Card({ children, as: Tag = 'div', hoverable = false, className }: CardProps) {
  return <Tag className={cn(styles.card, hoverable && styles.hoverable, className)}>{children}</Tag>
}

import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

import styles from './Container.module.css'

interface ContainerProps {
  children: ReactNode
  className?: string | undefined
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>
}

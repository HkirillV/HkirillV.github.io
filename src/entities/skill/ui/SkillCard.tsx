import { cn } from '@/shared/lib'

import styles from './SkillCard.module.css'

interface SkillCardProps {
  children: string
  variant?: 'hard' | 'soft' | undefined
}

export function SkillCard({ children, variant = 'hard' }: SkillCardProps) {
  return <li className={cn(styles.skill, variant === 'soft' && styles.soft)}>{children}</li>
}

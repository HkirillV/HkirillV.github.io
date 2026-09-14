import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

import { Container } from '../Container/Container'
import { Reveal } from '../Reveal/Reveal'

import styles from './Section.module.css'

interface SectionProps {
  id: string
  title: ReactNode
  children: ReactNode
  eyebrow?: string | undefined
  description?: string | undefined
  className?: string | undefined
}

export function Section({ id, title, children, eyebrow, description, className }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section id={id} aria-labelledby={headingId} className={cn(styles.section, className)}>
      <Container>
        <Reveal as="header" className={styles.header}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}

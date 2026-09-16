import { EXPERIENCE, ExperienceCard } from '@/entities/experience'
import { Accent, Reveal, Section } from '@/shared/ui'

import styles from './Experience.module.css'

const STAGGER = 0.08

export function Experience() {
  return (
    <Section
      id="work-experience"
      title={
        <>
          Work <Accent>Experience</Accent>
        </>
      }
    >
      <ul className={styles.grid}>
        {EXPERIENCE.map((entry, index) => (
          <Reveal as="li" key={entry.id} delay={index * STAGGER} className={styles.item}>
            <ExperienceCard entry={entry} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

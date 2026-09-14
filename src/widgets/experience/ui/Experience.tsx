import { EXPERIENCE, ExperienceCard, totalExperienceMonths } from '@/entities/experience'
import { formatDuration } from '@/shared/lib'
import { Accent, Reveal, Section } from '@/shared/ui'

import styles from './Experience.module.css'

const STAGGER = 0.08

export function Experience() {
  return (
    <Section
      id="work-experience"
      eyebrow={`${formatDuration(totalExperienceMonths())} in total`}
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

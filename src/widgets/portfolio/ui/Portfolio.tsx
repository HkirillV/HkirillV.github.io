import { PROJECTS, ProjectCard } from '@/entities/project'
import { Accent, Reveal, Section } from '@/shared/ui'

import styles from './Portfolio.module.css'

const STAGGER = 0.08

export function Portfolio() {
  return (
    <Section
      id="portfolio"
      title={
        <>
          My <Accent>Portfolio</Accent>
        </>
      }
    >
      <ul className={styles.grid}>
        {PROJECTS.map((project, index) => (
          <Reveal as="li" key={project.id} delay={index * STAGGER} className={styles.item}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

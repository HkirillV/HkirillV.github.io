import { HARD_SKILLS, SkillCard, SOFT_SKILLS } from '@/entities/skill'
import { Accent, Reveal, Section } from '@/shared/ui'

import styles from './Skills.module.css'

const LIST_DELAY = 0.06

interface SkillGroupProps {
  heading: string
  skills: readonly string[]
  variant: 'hard' | 'soft'
  listClassName: string | undefined
}

function SkillGroup({ heading, skills, variant, listClassName }: SkillGroupProps) {
  return (
    <div>
      <Reveal>
        <h3 className={styles.title}>
          <Accent>{heading}</Accent> skills
        </h3>
      </Reveal>
      <Reveal delay={LIST_DELAY}>
        <ul className={listClassName}>
          {skills.map((skill) => (
            <SkillCard key={skill} variant={variant}>
              {skill}
            </SkillCard>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}

export function Skills() {
  return (
    <Section
      id="skills"
      title={
        <>
          My <Accent>Skills</Accent>
        </>
      }
    >
      <div className={styles.grid}>
        <SkillGroup
          heading="Hard"
          skills={HARD_SKILLS}
          variant="hard"
          listClassName={styles.list}
        />
        <SkillGroup
          heading="Soft"
          skills={SOFT_SKILLS}
          variant="soft"
          listClassName={styles.listSoft}
        />
      </div>
    </Section>
  )
}

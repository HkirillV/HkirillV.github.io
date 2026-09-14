import { totalExperienceMonths } from '@/entities/experience'
import { PROFILE } from '@/entities/profile'
import { wholeYears } from '@/shared/lib'

import styles from './HeroStats.module.css'

interface Stat {
  readonly value: string
  readonly label: string
}

function stats(): readonly Stat[] {
  return [
    { value: `${wholeYears(totalExperienceMonths())}+`, label: 'years in frontend' },
    { value: PROFILE.level, label: 'current grade' },
    { value: `${PROFILE.projectsShipped}+`, label: 'projects shipped' },
  ]
}

export function HeroStats() {
  return (
    <dl className={styles.list}>
      {stats().map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <dt className={styles.label}>{stat.label}</dt>
          <dd className={styles.value}>{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}

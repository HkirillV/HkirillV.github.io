import { EXTERNAL_LINK_PROPS, formatMonth } from '@/shared/lib'
import { Card, TechList } from '@/shared/ui'

import type { ExperienceEntry } from '../model/experience'

import styles from './ExperienceCard.module.css'

function period(entry: ExperienceEntry): string {
  const until = entry.endedAt ? formatMonth(entry.endedAt) : 'Present'

  return `${formatMonth(entry.startedAt)} — ${until}`
}

export function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <Card as="article" hoverable className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.title}>
          <a
            className={styles.link}
            href={entry.companyUrl}
            title="Open the company website in a new tab"
            {...EXTERNAL_LINK_PROPS}
          >
            {entry.company}
          </a>
        </h3>
        <time className={styles.date} dateTime={`${entry.startedAt}/${entry.endedAt ?? ''}`}>
          {period(entry)}
        </time>
      </div>
      <p className={styles.position}>{entry.position}</p>
      <p className={styles.summary}>{entry.summary}</p>
      <TechList items={entry.stack} label={`${entry.company} stack`} />
    </Card>
  )
}

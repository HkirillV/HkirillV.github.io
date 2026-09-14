import { EXTERNAL_LINK_PROPS, formatMonth } from '@/shared/lib'
import { Card, TechList } from '@/shared/ui'

import type { Project } from '../model/projects'
import { ProjectPreview } from './ProjectPreview'

import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" className={styles.card}>
      <ProjectPreview id={project.id} title={project.title} />
      <div className={styles.body}>
        <time className={styles.date} dateTime={project.releasedAt}>
          {formatMonth(project.releasedAt)}
        </time>
        <h3 className={styles.title}>
          <a
            className={styles.link}
            href={project.url}
            title="Open the project in a new tab"
            {...EXTERNAL_LINK_PROPS}
          >
            {project.title}
          </a>
        </h3>
        <p className={styles.description}>{project.description}</p>
        <TechList items={project.stack} label={`${project.title} stack`} />
      </div>
    </Card>
  )
}

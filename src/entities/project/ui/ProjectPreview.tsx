import { useCallback, useState } from 'react'

import { PREVIEW_IMAGE } from '@/shared/config'
import { ErrorBoundary, Lightbox } from '@/shared/ui'

import styles from './ProjectPreview.module.css'

interface ProjectPreviewProps {
  id: string
  title: string
}

export function ProjectPreview({ id, title }: ProjectPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const src = `/projects/${id}.webp`

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className={styles.preview}>
      <button
        type="button"
        data-preview-stage
        className={styles.trigger}
        onClick={open}
        aria-label={`Open full-size screenshot of ${title}`}
      >
        <img
          className={styles.screenshot}
          src={src}
          alt=""
          width={PREVIEW_IMAGE.width}
          height={PREVIEW_IMAGE.height}
          loading="lazy"
          decoding="async"
        />
      </button>
      <ErrorBoundary>
        <Lightbox isOpen={isOpen} onClose={close} src={src} alt={`${title} — full screenshot`} />
      </ErrorBoundary>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { cn, useBodyScrollLock, useEscapeKey, useFocusTrap } from '@/shared/lib'

import { CloseIcon, ZoomInIcon, ZoomOutIcon } from '../icons/icons'
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'

import styles from './Lightbox.module.css'

interface LightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen)

  useEscapeKey(isOpen, onClose)
  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) setIsZoomed(false)
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div ref={trapRef} className={styles.overlay} role="dialog" aria-modal="true" aria-label={alt}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => {
            setIsZoomed((zoomed) => !zoomed)
          }}
          aria-pressed={isZoomed}
        >
          {isZoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
          <VisuallyHidden>{isZoomed ? 'Zoom out' : 'Zoom in'}</VisuallyHidden>
        </button>
        <button type="button" className={styles.toolbarButton} onClick={onClose}>
          <CloseIcon />
          <VisuallyHidden>Close</VisuallyHidden>
        </button>
      </div>

      <div
        className={cn(styles.frame, isZoomed && styles.zoomed)}
        {...(isZoomed ? { tabIndex: 0, role: 'group', 'aria-label': `${alt}, scrollable` } : {})}
      >
        <img className={styles.image} src={src} alt={alt} />
      </div>
    </div>,
    document.body,
  )
}

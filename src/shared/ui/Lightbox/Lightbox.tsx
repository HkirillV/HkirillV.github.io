import { createPortal } from 'react-dom'

import { useBodyScrollLock, useEscapeKey, useFocusTrap } from '@/shared/lib'

import { CloseIcon } from '../icons/icons'
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden'

import styles from './Lightbox.module.css'

interface LightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen)

  useEscapeKey(isOpen, onClose)
  useBodyScrollLock(isOpen)

  if (!isOpen) return null

  return createPortal(
    <div ref={trapRef} className={styles.overlay} role="dialog" aria-modal="true" aria-label={alt}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.toolbar}>
        <button type="button" className={styles.toolbarButton} onClick={onClose}>
          <CloseIcon />
          <VisuallyHidden>Close</VisuallyHidden>
        </button>
      </div>

      <div className={styles.frame}>
        <img className={styles.image} src={src} alt={alt} />
      </div>
    </div>,
    document.body,
  )
}

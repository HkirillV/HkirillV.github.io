import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from 'react'

import { cn, replayAnimation } from '@/shared/lib'

import styles from './Button.module.css'

function ripple(event: PointerEvent<HTMLElement>): void {
  const node = event.currentTarget
  const bounds = node.getBoundingClientRect()

  node.style.setProperty('--rippleX', `${event.clientX - bounds.left}px`)
  node.style.setProperty('--rippleY', `${event.clientY - bounds.top}px`)
  replayAnimation(node, styles.ripple)
}

type ButtonProps = { children: ReactNode } & (
  | ({ href: string } & ComponentPropsWithoutRef<'a'>)
  | ({ href?: undefined } & ComponentPropsWithoutRef<'button'>)
)

export function Button({ children, ...rest }: ButtonProps) {
  const className = cn(styles.button, rest.className)

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ComponentPropsWithoutRef<'a'> & { href: string }

    return (
      <a {...anchorProps} href={href} className={className} onPointerDown={ripple}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = rest as ComponentPropsWithoutRef<'button'>

  return (
    <button {...buttonProps} type={type} className={className} onPointerDown={ripple}>
      {children}
    </button>
  )
}

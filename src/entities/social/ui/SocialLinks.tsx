import type { ComponentType, SVGProps } from 'react'

import { externalLinkProps } from '@/shared/lib'
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, VisuallyHidden } from '@/shared/ui'

import { SOCIALS, type SocialId } from '../model/socials'

import styles from './SocialLinks.module.css'

const ICONS: Record<SocialId, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  telegram: TelegramIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
}

export function SocialLinks() {
  return (
    <ul className={styles.list}>
      {SOCIALS.map((social) => {
        const Icon = ICONS[social.id]

        return (
          <li key={social.id}>
            <a
              className={styles.link}
              href={social.href}
              title={social.label}
              {...externalLinkProps(social.href)}
            >
              <Icon />
              <VisuallyHidden>{social.label}</VisuallyHidden>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

import { HERO_STAGES, PROFILE } from '@/entities/profile'
import { EXTERNAL_LINK_PROPS, useIntroFinished, useLiveTyping } from '@/shared/lib'
import { Button, Container, ErrorBoundary, Reveal } from '@/shared/ui'

import { HeroDeck } from './deck/HeroDeck'
import { HeroStats } from './HeroStats'
import { TypedHeadline } from './TypedHeadline'

import styles from './Hero.module.css'

export function Hero() {
  const isIntroFinished = useIntroFinished()
  const { lines, isDone } = useLiveTyping(HERO_STAGES, { enabled: isIntroFinished })

  return (
    <section id="about" className={styles.hero} aria-label="Introduction">
      <Container>
        <div className={styles.inner}>
          <div>
            <p className={styles.eyebrow}>
              {PROFILE.role} —{' '}
              <a className={styles.company} href={PROFILE.company.url} {...EXTERNAL_LINK_PROPS}>
                {PROFILE.company.name}
              </a>
            </p>

            <TypedHeadline stages={HERO_STAGES} lines={lines} isDone={isDone} />

            <Reveal className={styles.summary} delay={0.05}>
              <p>{PROFILE.summary}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <HeroStats />
            </Reveal>

            <Reveal className={styles.actions} delay={0.1}>
              <Button href="#contacts">Let’s check!</Button>
            </Reveal>
          </div>

          <ErrorBoundary>
            <HeroDeck />
          </ErrorBoundary>
        </div>
      </Container>
    </section>
  )
}

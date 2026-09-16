import { HERO_STAGES } from '@/entities/profile'
import { useIntroFinished, useLiveTyping } from '@/shared/lib'
import { Button, Container, ErrorBoundary, Reveal } from '@/shared/ui'

import { HeroDeck } from './deck/HeroDeck'
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
            <TypedHeadline stages={HERO_STAGES} lines={lines} isDone={isDone} />

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

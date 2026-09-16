import { FULL_NAME } from '@/entities/profile'
import { SocialLinks } from '@/entities/social'
import { SITE } from '@/shared/config'
import { Accent, Card, Container, Reveal } from '@/shared/ui'

import styles from './Footer.module.css'

const SECTION_ID = 'contacts'
const TITLE_ID = `${SECTION_ID}-title`

export function Footer() {
  return (
    <footer id={SECTION_ID} className={styles.footer} aria-labelledby={TITLE_ID}>
      <Container>
        <Reveal>
          <Card className={styles.inner}>
            <div className={styles.main}>
              <h2 id={TITLE_ID} className={styles.title}>
                Do you want to ask
                <br />
                <Accent>something interesting?</Accent>
              </h2>
              <p className={styles.text}>Contact me. I am in touch {SITE.availability}.</p>
            </div>

            <div className={styles.side}>
              <SocialLinks />

              <p className={styles.copyright}>
                © {FULL_NAME}, {SITE.copyrightYear}
              </p>
            </div>
          </Card>
        </Reveal>
      </Container>
    </footer>
  )
}

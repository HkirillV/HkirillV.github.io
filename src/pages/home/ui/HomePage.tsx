import { Experience } from '@/widgets/experience'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Hero } from '@/widgets/hero'
import { Portfolio } from '@/widgets/portfolio'
import { Skills } from '@/widgets/skills'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Portfolio />
        <Experience />
      </main>
      <Footer />
    </>
  )
}

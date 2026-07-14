import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Stats } from '@/components/stats'
import { Features } from '@/components/features'
import { UseCases } from '@/components/use-cases'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="w-full bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <Stats />
      <Features />
      <UseCases />
      <CtaSection />
      <Footer />
    </main>
  )
}

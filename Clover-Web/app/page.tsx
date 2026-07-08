import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { UseCases } from '@/components/use-cases'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Page() {

  
  return (
    <main className="w-full bg-background">
      <Header />
      <Hero />
      <Features />
      <UseCases />
      <CtaSection />
      <Footer />
    </main>
  )
}

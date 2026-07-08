'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'


export function CtaSection() {
  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-surface-secondary/40 to-surface-secondary/20 backdrop-blur overflow-hidden p-12 md:p-16">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Ready to Ship?
            </h2>
            <p className="text-lg text-muted max-w-xl mx-auto mb-8">
              Start building your onchain product today. Get a fully configured monorepo in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium"
              >
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border text-foreground hover:bg-surface-secondary"
              >
                Read the Docs
              </Button>
            </div>

            <p className="text-sm text-muted mt-8">
              🍀 Built with luck and on-chain logic, on Stellar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

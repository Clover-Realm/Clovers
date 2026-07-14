import { ArrowRight, GitBranch } from 'lucide-react'
import { Button } from './ui/button'

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Gradient background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary/50 backdrop-blur px-4 py-2">
          <span className="text-lg">🍀</span>
          <span className="text-sm text-muted">Build onchain on Stellar</span>
        </div>




        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
          Ship Onchain Apps
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Faster</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto text-balance leading-relaxed mb-8">
          The unified monorepo that brings together Soroban smart contracts, Express API, React frontend, and infrastructure. One codebase. All four leaves of the clover.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
              <GitBranch className="w-5 h-5 mr-2" />
              GitHub
            </Button>
        </div>

        {/* Command prompt */}
        <div className="inline-flex items-center gap-3 bg-surface-secondary/30 border border-border rounded-lg px-4 py-3 text-sm text-muted font-mono backdrop-blur">
          <span className="text-primary">$</span>
          <span className="text-foreground">npm create clover@latest</span>
        </div>
      </div>
    </section>
  )
}

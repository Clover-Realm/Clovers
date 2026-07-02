import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-primary/5 p-12 sm:p-16 overflow-hidden">
          {/* Gradient backdrop */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              Ready to Build Onchain?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join developers shipping the next generation of consumer onchain products on Stellar. CLO-VER makes it fast and simple.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-8 py-3 bg-primary text-background font-medium rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                className="px-8 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors flex items-center justify-center"
              >
                GitHub
              </a>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              Built with 🍀 luck and on-chain logic, on Stellar
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

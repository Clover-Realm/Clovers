import { Terminal, Package, Cpu } from 'lucide-react'

export function DeveloperStack() {


  
  const stacks = [
    {
      icon: Cpu,
      title: 'Smart Contracts',
      tech: 'Rust + Soroban',
      details: ['Type-safe Soroban contracts', 'Stellar SDK integration', 'Testing framework included'],
    },
    {
      icon: Terminal,
      title: 'Backend API',
      tech: 'Express + TypeScript',
      details: ['RESTful architecture', 'Authentication & sessions', 'Contract interaction layer'],
    },
    {
      icon: Package,
      title: 'Frontend',
      tech: 'React 19 + Tailwind',
      details: ['Mobile-first responsive', 'Wallet integration', 'Real-time state sync'],
    },
  ]

  return (
    <section id="stack" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Modern Tech Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every layer uses the latest tools and best practices for building production-ready applications
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stacks.map((stack, i) => {
            const Icon = stack.icon
            return (
              <div
                key={i}
                className="group relative p-8 rounded-xl border border-border bg-secondary hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{stack.title}</h3>
                    <p className="text-sm text-primary font-mono">{stack.tech}</p>
                  </div>
                </div>

                {/* Tech Details */}
                <ul className="space-y-2 pl-0">
                  {stack.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary/50"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Fully integrated with shared types and utilities across all three layers
          </p>
          <a href="https://github.com" className="inline-block px-6 py-2 text-primary font-medium hover:underline">
            View Example Project →
          </a>
        </div>
      </div>
    </section>
  )
}

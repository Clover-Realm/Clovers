import { Code2, Zap, Smartphone, Rocket } from 'lucide-react'

export function Features() {
  const features = [


    
    {
      icon: Code2,
      title: 'Soroban Contracts',
      description: 'Write smart contracts in Rust. Full type safety, automated testing, and Stellar-native optimizations.',
    },
    {
      icon: Rocket,
      title: 'Express API',
      description: 'Fast backend layer with built-in wallet integration, session management, and contract interaction.',
    },
    {
      icon: Smartphone,
      title: 'React Frontend',
      description: 'Mobile-first components. Pre-built wallet connections and real-time onchain state management.',
    },
    {
      icon: Zap,
      title: 'Infrastructure',
      description: 'One-click Stellar deployment. Automated CI/CD, monitoring, and production-ready tooling included.',
    },


    
  ]

  const benefits = [
    { metric: '70%', description: 'Less Boilerplate Code' },
    { metric: '5min', description: 'Deploy to Stellar' },
    { metric: '1', description: 'Unified Monorepo' },
    { metric: '∞', description: 'Possibilities' },
  ]

  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            All Four Leaves in One
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            The complete stack for building onchain products. Contracts, API, frontend, and infrastructure unified.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group p-8 rounded-xl border border-border bg-surface-secondary/20 backdrop-blur hover:bg-surface-secondary/40 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((item) => (
            <div
              key={item.metric}
              className="p-6 rounded-lg border border-border/50 bg-surface-secondary/20 text-center hover:bg-surface-secondary/40 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {item.metric}
              </div>
              <div className="text-sm text-muted">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

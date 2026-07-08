import { Code2, Zap, Smartphone, Boxes } from 'lucide-react'

export function Pillars() {

  
  const pillars = [
    {
      icon: Code2,
      title: 'Smart Contracts',
      description: 'Rust/Soroban contracts with full Stellar integration. Type-safe, auditable, and gas-optimized.',
      items: ['Rust/Soroban', 'Stellar SDK', 'Testing', 'Gas Optimized'],
    },
    {
      icon: Zap,
      title: 'API Layer',
      description: 'Express backend with authentication, wallet verification, and contract interaction.',
      items: ['Express.js', 'Session Mgmt', 'Rate Limiting', 'Caching'],
    },
    {
      icon: Smartphone,
      title: 'React Frontend',
      description: 'Mobile-first UI with wallet integration, real-time sync, and responsive design.',
      items: ['React 19+', 'Wallet Support', 'Responsive', 'Real-time'],
    },
    {
      icon: Boxes,
      title: 'Infrastructure',
      description: 'Complete deployment, monitoring, and DevOps — preconfigured and ready to scale.',
      items: ['Docker', 'CI/CD', 'Monitoring', 'Auto-scaling'],
    },
  ]

  return (
    <section id="pillars" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Four Pillars, One Codebase
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Like a four-leaf clover, CLO-VER brings together contracts, logic, onchain capabilities, and verified infrastructure in one unified foundation.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={i}
                className="group relative p-8 rounded-xl border border-border bg-secondary hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">{pillar.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {pillar.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary/80 border border-primary/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

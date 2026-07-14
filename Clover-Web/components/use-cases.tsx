import { Gamepad2, Zap, Users } from 'lucide-react'

export function UseCases() {
  const products = [
    {
      icon: Gamepad2,
      title: 'Onchain Games',
      description: 'Build immersive blockchain games with real asset ownership, fast transactions, and true player economics.',
      examples: ['Turn-based RPGs', 'Trading games', 'Collectibles', 'P2P battles'],
    },
    {
      icon: Zap,
      title: 'Mini-Apps',
      description: 'Create lightweight, focused applications that integrate seamlessly with the Stellar wallet ecosystem.',
      examples: ['Token swaps', 'Yield farming', 'Predictions', 'Voting systems'],
    },
    {
      icon: Users,
      title: 'Social-Fi Products',
      description: 'Build community-driven platforms with native token economics, rewards, and social features.',
      examples: ['Creator platforms', 'Social tokens', 'DAOs', 'Community tipping'],
    },
  ]



  
  return (
    <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Built for Every Product
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Games, mini-apps, social-fi. CLO-VER supports the full range of consumer onchain apps.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const Icon = product.icon
            return (
              <div
                key={i}
                className="group p-8 rounded-xl border border-border bg-surface-secondary/20 backdrop-blur hover:bg-surface-secondary/40 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 mb-4 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">{product.title}</h3>
                <p className="text-muted text-sm mb-6 leading-relaxed">{product.description}</p>

                {/* Examples */}
                <div className="space-y-2">
                  {product.examples.map((example, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-muted">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
                      <span>{example}</span>
                    </div>
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

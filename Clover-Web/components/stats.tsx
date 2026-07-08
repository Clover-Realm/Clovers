export function Stats() {
  const stats = [
    { metric: '4', label: 'Unified Pillars' },
    { metric: '3x', label: 'Faster to Ship' },
    { metric: '100%', label: 'Type-Safe' },
    { metric: '1', label: 'Monorepo' },
  ]



  
  return (
    <section className="border-y border-border bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.metric}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const stats = [
  { value: '70%', label: 'Less boilerplate' },
  { value: '5 min', label: 'To deploy on Stellar' },
  { value: '4', label: 'Unified pillars' },
  { value: '100%', label: 'Onchain-first' },
]

export function Stats() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-surface-secondary/10 backdrop-blur">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              {s.value}
            </div>
            <div className="text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

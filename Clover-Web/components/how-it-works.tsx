import { Download, Code2, Server, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Download,
    title: 'Scaffold the Monorepo',
    description:
      'One command gives you contracts, API, frontend, and tooling — pre-wired and ready to run locally.',
    command: 'npm create clover@latest',
  },
  {
    icon: Code2,
    title: 'Write Soroban Contracts',
    description:
      'Build verified, Rust-based smart contracts with shared types and end-to-end tests.',
    command: 'soroban contract build',
  },
  {
    icon: Server,
    title: 'Run the Express API',
    description:
      'Serve wallet connections, sessions, and contract reads through a typed Express backend.',
    command: 'npm run dev --workspace api',
  },
  {
    icon: Rocket,
    title: 'Ship the React App',
    description:
      'Launch a mobile-first frontend with wallet-native UX and real-time onchain state.',
    command: 'npm run dev --workspace web',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            From Idea to Onchain in Four Steps
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            CLO-VER turns the usual glue code into a guided path. Each leaf of the
            clover is a step you can run today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className="group relative p-8 rounded-xl border border-border bg-surface-secondary/20 backdrop-blur hover:bg-surface-secondary/40 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-background/60 border border-border rounded-md px-3 py-2 text-xs text-muted font-mono">
                  <span className="text-primary">$</span>
                  <span className="text-foreground">{step.command}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

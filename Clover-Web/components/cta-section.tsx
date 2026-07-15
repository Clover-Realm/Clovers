'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import { Button } from './ui/button'

export function CtaSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const value = email.trim()
    if (!value) {
      setError('Please enter your email address.')
      return
    }
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    // No backend yet — capture intent locally. Wire to the API/SDK later.
    setSubmitted(true)
  }

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
              Start building your onchain product today. Get a fully configured
              monorepo in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <CheckCircle2 className="w-5 h-5" />
                <span>You&apos;re on the list — we&apos;ll be in touch soon. 🍀</span>
              </div>
            ) : (
              <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
                noValidate
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@stellar.org"
                    aria-label="Email address"
                    aria-invalid={error ? true : undefined}
                    className={`w-full h-9 rounded-lg border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${
                      error
                        ? 'border-destructive focus-visible:border-destructive'
                        : 'border-border focus-visible:border-ring'
                    }`}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium"
                >
                  Join Waitlist <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
              {error && (
                <p className="text-sm text-destructive mt-3" role="alert">
                  {error}
                </p>
              )}
              </>
            )}

            <p className="text-sm text-muted mt-8">
              🍀 Built with luck and on-chain logic, on Stellar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

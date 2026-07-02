import { GitBranch, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      label: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Products', href: '#products' },
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'MIT License', href: '#' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Stellar Docs', href: '#' },
        { name: 'Soroban Guide', href: '#' },
        { name: 'Examples', href: '#' },
      ],
    },
    {
      label: 'Community',
      links: [
        { name: 'Discussions', href: '#' },
        { name: 'Contributing', href: '#' },
        { name: 'Issues', href: '#' },
        { name: 'Stellar Dev', href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-surface-secondary/20 backdrop-blur py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background font-bold text-sm">
                ✿
              </div>
              <span className="font-bold text-foreground">CLO-VER</span>
            </div>
            <p className="text-sm text-muted">
              A unified monorepo for building fast, mobile-first onchain experiences on Stellar.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com" className="text-muted hover:text-foreground transition-colors p-2 hover:bg-surface-secondary rounded-lg">
                <GitBranch className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted hover:text-foreground transition-colors p-2 hover:bg-surface-secondary rounded-lg">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group, i) => (
            <div key={i}>
              <h4 className="font-semibold text-foreground mb-4 text-sm">{group.label}</h4>
              <ul className="space-y-3">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {currentYear} CLO-VER. 🍀 Built with luck and on-chain logic.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

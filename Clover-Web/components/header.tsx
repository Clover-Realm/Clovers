'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background font-bold">
              ✿
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">CLO-VER</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted hover:text-foreground transition-colors">Features</a>
            <a href="#products" className="text-sm text-muted hover:text-foreground transition-colors">Products</a>
            <a href="https://github.com" className="text-sm text-muted hover:text-foreground transition-colors">GitHub</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg">Get Started</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <a href="#features" className="block px-2 py-2 text-sm text-muted hover:text-foreground hover:bg-surface-secondary rounded-lg transition-colors">Features</a>
            <a href="#products" className="block px-2 py-2 text-sm text-muted hover:text-foreground hover:bg-surface-secondary rounded-lg transition-colors">Products</a>
            <a href="https://github.com" className="block px-2 py-2 text-sm text-muted hover:text-foreground hover:bg-surface-secondary rounded-lg transition-colors">GitHub</a>
            <div className="pt-3 space-y-2 border-t border-border">
              <a href="#" className="block px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg">Get Started</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

"use client";

import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, CodeBracketIcon, BugAntIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const [dark, setDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDark(true);
    }
  }, []);

  // Apply theme class when dark state changes
  useEffect(() => {
    if (!mounted) return;
    
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [dark, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <CodeBracketIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Online compiler</span>
                <span className="ml-2 text-xs text-muted font-mono bg-tertiary px-2 py-1 rounded-md">v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <CodeBracketIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">Online compiler</span>
              <span className="ml-2 text-xs text-muted font-mono bg-tertiary px-2 py-1 rounded-md">v2.0</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link font-medium">
              Features
            </a>
            <a href="/docs" className="nav-link font-medium">
              Documentation
            </a>
            <a href="/sql" className="nav-link font-medium">
              sql compiler
            </a>
            <a href="/editor" className="nav-link font-medium">
              html compiler
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-lg theme-toggle focus-ring"
            >
              {dark ? (
                <SunIcon className="h-5 w-5 text-warning" />
              ) : (
                <MoonIcon className="h-5 w-5 text-accent" />
              )}
            </button>

            {session ? (
              <Link href="/profile" className="nav-link font-medium">
                Profile
              </Link>
            ) : (
              <Link href="/login" className="nav-link font-medium">
                Login
              </Link>
            )}

            {/* Report Bug Button */}
            <a
              href="https://github.com/kenilgamer/cpp-compiler/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 btn-secondary rounded-lg focus-ring"
            >
              <BugAntIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Report Bug</span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/kenilgamer"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 btn-secondary rounded-lg focus-ring"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </a>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg theme-toggle focus-ring">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
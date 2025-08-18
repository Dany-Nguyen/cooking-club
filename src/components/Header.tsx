'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Categories', href: '#categories' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CC</span>
          </div>
          <span className="hidden font-bold sm:inline-block text-foreground">
            Cooking Club
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button size="sm">
            Join Now
          </Button>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={cn('h-6 w-6', isMenuOpen && 'hidden')}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg
              className={cn('h-6 w-6', !isMenuOpen && 'hidden')}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Sign In
              </Button>
              <Button size="sm" className="w-full">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

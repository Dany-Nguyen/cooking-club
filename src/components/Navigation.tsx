'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Categories', href: '#categories' },
    { name: 'Favorites', href: '#favorites' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-50/70 backdrop-blur-md border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-800 to-yellow-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍳</span>
              </div>
              <span className="text-xl font-bold text-yellow-900">Cooking Club</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex space-x-8"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-yellow-800 hover:text-yellow-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-yellow-800 hover:text-yellow-900 p-2"
            >
              {isOpen ? (
                <span className="text-xl">✕</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-amber-50 border-t border-amber-200"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-yellow-800 hover:text-yellow-900 hover:bg-amber-100"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

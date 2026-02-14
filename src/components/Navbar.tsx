'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation items configuration.
 */
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'The Couple', href: '#couple' },
  { name: 'Ceremony', href: '#ceremony' },
  { name: 'Reception', href: '#reception' },
  { name: 'Gift List', href: '#gifts' },
  { name: 'RSVP', href: '#rsvp' },
  { name: 'Messages', href: '#messages' },
];

/**
 * Navbar component providing sticky navigation and mobile-responsive menu.
 * @return {JSX.Element} The rendered navbar.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /**
     * Updates scrolled state based on window position.
     */
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center max-w-5xl'>
        <a href='#home' className='text-2xl font-heading text-primary'>
          A & C
        </a>

        {/* Desktop Nav */}
        <div className='hidden md:flex space-x-8'>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm uppercase tracking-widest hover:text-primary transition-colors duration-200'
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className='md:hidden text-foreground'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-background border-b border-accent/20 overflow-hidden'
          >
            <div className='flex flex-col space-y-4 p-6 text-center'>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className='text-sm uppercase tracking-widest hover:text-primary transition-colors'
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

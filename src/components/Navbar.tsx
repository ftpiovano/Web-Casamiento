'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Navigation items configuration.
 */
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'The Couple', href: '#couple' },
  { name: 'Ceremony', href: '#ceremony' },
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
  const { region, setRegion } = useLanguage();

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
        <div className='hidden md:flex items-center space-x-8'>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200'
            >
              {item.name}
            </a>
          ))}
          
          {/* Region Switcher */}
          <div className='flex items-center gap-2 border-l border-accent/20 pl-6 ml-2'>
            <button 
              onClick={() => setRegion('br')}
              className={`text-[10px] uppercase tracking-tighter ${region === 'br' ? 'font-bold text-primary' : 'opacity-40'}`}
            >
              BR
            </button>
            <span className='opacity-20'>|</span>
            <button 
              onClick={() => setRegion('ar')}
              className={`text-[10px] uppercase tracking-tighter ${region === 'ar' ? 'font-bold text-primary' : 'opacity-40'}`}
            >
              AR
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='flex items-center gap-4 md:hidden'>
          <button 
            onClick={() => setRegion(region === 'br' ? 'ar' : 'br')}
            className='p-2 text-primary/60'
          >
            <Globe size={20} />
          </button>
          <button
            className='text-foreground'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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

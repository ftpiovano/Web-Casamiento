'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useSection, SectionKey } from '@/context/SectionContext';
import { siteConfig } from '@/site.config';

const navOrder: SectionKey[] = [
  'home',
  'couple',
  'ceremony',
  'travel',
  'gifts',
  'rsvp',
  'messages',
];

/**
 * Navbar component providing sticky tab-style navigation between sections.
 * @return {JSX.Element} The rendered navbar.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { region, setRegion, config } = useLanguage();
  const { activeSection, setActiveSection } = useSection();
  const navItems = navOrder.map((key) => ({ key, name: config.content.nav[key] }));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (key: SectionKey) => {
    setActiveSection(key);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center max-w-5xl'>
        <button
          onClick={() => go('home')}
          aria-label={config.content.nav.home}
          className='flex items-center'
        >
          <Image
            src='/branding/wedding-logo.svg'
            alt={`${siteConfig.names.bride} & ${siteConfig.names.groom}`}
            width={120}
            height={120}
            priority
            className='h-10 w-auto select-none transition-opacity hover:opacity-80'
          />
        </button>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center space-x-8'>
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => go(item.key)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-xs uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId='nav-underline'
                    className='absolute left-0 right-0 -bottom-2 h-px bg-primary'
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

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
            <span className='opacity-20'>|</span>
            <button
              onClick={() => setRegion('en')}
              className={`text-[10px] uppercase tracking-tighter ${region === 'en' ? 'font-bold text-primary' : 'opacity-40'}`}
            >
              EN
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
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => go(item.key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-sm uppercase tracking-widest transition-colors ${
                      isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

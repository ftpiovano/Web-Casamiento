'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/site.config';
import { Button, Typography } from './Base';

/**
 * Hero section component displaying the couple's names, monogram, and wedding date.
 * @return {JSX.Element} The rendered hero section.
 */
export function Hero() {
  const { names, eventDate } = siteConfig;
  const date = new Date(eventDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, ' | ');

  return (
    <section
      id='home'
      className='relative h-screen flex flex-col items-center justify-center text-center px-6 bg-background overflow-hidden'
    >
      {/* Background Texture/Overlay Placeholder */}
      <div className='absolute inset-0 bg-accent/5 opacity-50 z-0' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10'
      >
        {/* Monogram */}
        <div className='mb-8 flex items-center justify-center space-x-4 text-primary'>
          <span className='text-3xl font-heading'>{names.bride[0]}</span>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-primary/40'
          >
            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
          </svg>
          <span className='text-3xl font-heading'>{names.groom[0]}</span>
        </div>

        <Typography as='h1' className='mb-4'>
          {names.bride} & {names.groom}
        </Typography>

        <p className='text-lg md:text-xl tracking-[0.2em] uppercase text-foreground/60 mb-12'>
          {date}
        </p>

        <a href='#rsvp'>
          <Button variant='primary'>RSVP</Button>
        </a>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='absolute bottom-10'
      >
        <div className='w-[1px] h-12 bg-primary/30' />
      </motion.div>
    </section>
  );
}

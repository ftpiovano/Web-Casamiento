'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/site.config';
import { Button, Typography } from './Base';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Hero section component displaying the couple's names, monogram, and wedding date.
 * @return {JSX.Element} The rendered hero section.
 */
export function Hero() {
  const { names, eventDate } = siteConfig;
  const { region } = useLanguage();
  const groom = names.groom[region];
  
  const locale = region === 'br' ? 'pt-BR' : region === 'ar' ? 'es-AR' : 'en-US';
  
  const parts = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(new Date(eventDate));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  const date = `${part('day')} | ${part('month').replace(/\.$/, '')} | ${part('year')}`;

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
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className='mx-auto mb-6 w-48 sm:w-56 md:w-72'
        >
          <Image
            src='/branding/wedding-logo.png'
            alt={`${names.bride} & ${groom} monogram`}
            width={969}
            height={1279}
            priority
            className='w-full h-auto select-none'
          />
        </motion.div>

        <Typography as='h1' className='mb-4'>
          {names.bride} & {groom}
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

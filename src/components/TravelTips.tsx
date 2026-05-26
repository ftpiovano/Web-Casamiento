'use client';

import { MapPin, Compass, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, Typography, Button } from './Base';
import { siteConfig } from '@/site.config';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Travel Tips section — curated destinations across northeast Brazil.
 * @return {JSX.Element} The rendered travel tips section.
 */
export function TravelTips() {
  const { region, config } = useLanguage();
  const { content } = config;

  const tips = siteConfig.travelTips.map((tip) => ({
    id: tip.id,
    mapLink: tip.mapLink,
    image: tip.image,
    ...tip.localized[region],
  }));

  return (
    <Section id='travel' className='bg-accent/5'>
      <Typography as='h2'>{content.travelTipsTitle}</Typography>
      <Typography className='text-center max-w-2xl mx-auto mb-12 opacity-70'>
        {content.travelTipsIntro}
      </Typography>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tips.map((tip, i) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
            className='h-full'
          >
            <div className='h-full flex flex-col bg-background rounded-2xl shadow-sm border border-accent/10 overflow-hidden transition-shadow hover:shadow-md'>
              <div className='relative aspect-[4/3] bg-gradient-to-br from-accent/30 via-primary/10 to-accent/40 overflow-hidden'>
                {tip.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tip.image}
                    alt={tip.name}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                ) : (
                  <div className='absolute inset-0 flex flex-col items-center justify-center text-primary/40'>
                    <ImageIcon size={28} strokeWidth={1.25} />
                    <span className='mt-2 text-[10px] uppercase tracking-[0.2em]'>
                      {tip.name}
                    </span>
                  </div>
                )}
                <span className='absolute top-3 left-4 font-heading text-background text-xs tracking-[0.2em] mix-blend-difference'>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className='p-6 flex flex-col flex-grow'>
                <Typography as='h3' className='!mb-2 leading-tight'>
                  {tip.name}
                </Typography>

                <p className='text-foreground/75 leading-relaxed mb-5 flex-grow'>
                  {tip.blurb}
                </p>

                <div className='flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/55 mb-4'>
                  <Compass size={14} className='text-primary/60' />
                  <span>{tip.distance}</span>
                </div>

                <a
                  href={tip.mapLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full'
                >
                  <Button variant='outline' className='w-full'>
                    <MapPin size={14} className='mr-2 inline' />
                    {content.travelMapButton}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

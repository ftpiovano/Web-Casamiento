'use client';

import { MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, Typography, Card, Button } from './Base';
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
          >
            <Card className='h-full flex flex-col'>
              <div className='flex items-start gap-3 mb-3'>
                <span className='font-heading text-primary/70 text-sm tracking-widest pt-1'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Typography as='h3' className='!mb-0 leading-tight'>
                  {tip.name}
                </Typography>
              </div>

              <p className='text-foreground/75 leading-relaxed mb-6 flex-grow'>
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
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

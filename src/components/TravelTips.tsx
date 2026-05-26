'use client';

import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, Typography, Button } from './Base';
import { siteConfig } from '@/site.config';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Travel Tips section — curated destinations across northeast Brazil.
 * Each card embeds an Instagram Reel and a fact-sheet of trip details.
 * @return {JSX.Element} The rendered travel tips section.
 */
export function TravelTips() {
  const { region, config } = useLanguage();
  const { content } = config;

  const tips = siteConfig.travelTips.map((tip) => ({
    id: tip.id,
    mapLink: tip.mapLink,
    reelUrl: tip.reelUrl,
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
              <div className='relative aspect-[9/16] bg-accent/10 overflow-hidden'>
                <iframe
                  src={`${tip.reelUrl}embed/`}
                  title={tip.name}
                  className='absolute inset-0 w-full h-full border-0'
                  scrolling='no'
                  allow='autoplay; encrypted-media; picture-in-picture'
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                />
                <span className='absolute top-3 left-4 font-heading text-background text-xs tracking-[0.2em] mix-blend-difference pointer-events-none z-10'>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className='p-6 flex flex-col flex-grow'>
                <Typography as='h3' className='!mb-2 leading-tight'>
                  {tip.name}
                </Typography>

                <p className='text-foreground/75 leading-relaxed mb-5'>
                  {tip.blurb}
                </p>

                <dl className='space-y-3.5 border-t border-accent/15 pt-5 mb-6 flex-grow'>
                  <FactRow label={content.travelLabelDistance} value={tip.distance} />
                  <FactRow label={content.travelLabelHighlights} value={tip.highlights} />
                  <FactRow label={content.travelLabelStay} value={tip.stay} />
                  <FactRow label={content.travelLabelBudget} value={tip.budget} />
                </dl>

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

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className='text-[10px] uppercase tracking-[0.18em] font-medium text-primary/70 mb-1'>
        {label}
      </dt>
      <dd className='text-sm leading-snug text-foreground/80'>{value}</dd>
    </div>
  );
}

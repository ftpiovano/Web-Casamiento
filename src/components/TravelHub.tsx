'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Typography } from './Base';
import { TravelTips } from './TravelTips';
import { useLanguage } from '@/context/LanguageContext';

type View = 'chooser' | 'brazil';

const hubContent: Record<
  'br' | 'ar' | 'en',
  {
    title: string;
    intro: string;
    back: string;
    brazil: { tag: string; name: string; blurb: string; cta: string };
    ba: { tag: string; name: string; blurb: string; cta: string };
  }
> = {
  br: {
    title: 'Dicas de Viagem',
    intro: 'Aproveite a viagem para conhecer um pouco mais — escolha um destino:',
    back: 'Voltar à seleção',
    brazil: {
      tag: '01',
      name: 'Nordeste do Brasil',
      blurb: 'Destinos próximos ao casamento na Bahia.',
      cta: 'Ver destinos',
    },
    ba: {
      tag: '02',
      name: 'Buenos Aires',
      blurb: 'Guia da cidade para sua estadia no casamento civil.',
      cta: 'Abrir guia',
    },
  },
  ar: {
    title: 'Tips de Viaje',
    intro: 'Aprovechá el viaje para conocer un poco más — elegí un destino:',
    back: 'Volver a la selección',
    brazil: {
      tag: '01',
      name: 'Nordeste de Brasil',
      blurb: 'Destinos cerca de la boda en Bahía.',
      cta: 'Ver destinos',
    },
    ba: {
      tag: '02',
      name: 'Buenos Aires',
      blurb: 'Guía de la ciudad para tu estadía durante la boda civil.',
      cta: 'Abrir guía',
    },
  },
  en: {
    title: 'Travel Tips',
    intro: 'Make the most of the trip — pick a destination:',
    back: 'Back to selection',
    brazil: {
      tag: '01',
      name: 'Northeast Brazil',
      blurb: 'Destinations near the wedding venue in Bahia.',
      cta: 'Browse destinations',
    },
    ba: {
      tag: '02',
      name: 'Buenos Aires',
      blurb: 'City guide for your stay around the civil wedding.',
      cta: 'Open guide',
    },
  },
};

/**
 * Travel hub — landing for the "Travel" nav entry. Lets the guest
 * choose between Northeast Brazil (renders the existing TravelTips
 * cards inline) and Buenos Aires (links to /buenos-aires).
 * @return {JSX.Element} The rendered hub.
 */
export function TravelHub() {
  const [view, setView] = useState<View>('chooser');
  const { region } = useLanguage();
  const t = hubContent[region];

  return (
    <AnimatePresence mode='wait'>
      {view === 'chooser' ? (
        <motion.div
          key='chooser'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Section id='travel' className='bg-accent/5'>
            <Typography as='h2'>{t.title}</Typography>
            <Typography className='text-center max-w-2xl mx-auto mb-14 opacity-70'>
              {t.intro}
            </Typography>

            <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
              <DestinationCard
                onClick={() => setView('brazil')}
                tag={t.brazil.tag}
                name={t.brazil.name}
                blurb={t.brazil.blurb}
                cta={t.brazil.cta}
                bg='/branding/brasil-bg.jpg'
                bgPosition='center top'
                alt='Nordeste do Brasil'
              />
              <DestinationCard
                href='/buenos-aires'
                tag={t.ba.tag}
                name={t.ba.name}
                blurb={t.ba.blurb}
                cta={t.ba.cta}
                bg='/branding/argentina-bg.jpg'
                alt='Buenos Aires'
              />
            </div>
          </Section>
        </motion.div>
      ) : (
        <motion.div
          key='brazil'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='container max-w-5xl mx-auto px-6 pt-28 md:pt-32 bg-accent/5'>
            <button
              onClick={() => setView('chooser')}
              className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-foreground transition-colors'
            >
              <ArrowLeft size={14} />
              {t.back}
            </button>
          </div>
          <TravelTips />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DestinationCard({
  onClick,
  href,
  tag,
  name,
  blurb,
  cta,
  bg,
  bgPosition = 'center',
  alt,
}: {
  onClick?: () => void;
  href?: string;
  tag: string;
  name: string;
  blurb: string;
  cta: string;
  bg: string;
  bgPosition?: string;
  alt: string;
}) {
  const inner = (
    <div className='group relative rounded-2xl border border-accent/30 bg-background overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col'>
      <div className='relative aspect-[5/3] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover transition-transform duration-500 group-hover:scale-105'
          style={{ backgroundImage: `url(${bg})`, backgroundPosition: bgPosition, opacity: 0.65 }}
          role='img'
          aria-label={alt}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/85' />
        <span className='absolute top-4 left-5 text-[11px] uppercase tracking-[0.3em] text-primary font-medium'>
          {tag}
        </span>
      </div>
      <div className='p-7 md:p-8 flex flex-col flex-grow'>
        <h3 className='font-heading text-2xl md:text-3xl mb-3 leading-tight'>{name}</h3>
        <p className='text-foreground/75 mb-6 leading-relaxed flex-grow'>{blurb}</p>
        <span className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium group-hover:gap-3 transition-all'>
          {cta}
          <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className='block h-full'>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className='text-left h-full' type='button'>
      {inner}
    </button>
  );
}

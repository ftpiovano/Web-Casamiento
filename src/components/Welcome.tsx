'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Section } from './Base';

const closingPhrase: Record<'br' | 'ar' | 'en', string> = {
  br: 'Sua presença é o nosso maior presente',
  ar: 'Su presencia es nuestro mayor regalo',
  en: 'Your presence is our greatest gift',
};

/**
 * Welcome section — editorial-style framing with botanical accents
 * above and below the message.
 * @return {JSX.Element} The rendered welcome section.
 */
export function Welcome() {
  const { config, region } = useLanguage();

  return (
    <Section id='welcome' className='bg-background !pt-10 md:!pt-16'>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className='max-w-xl mx-auto text-center'
      >
        <BotanicalSprig className='mx-auto mb-7 text-primary/55' />

        <h2 className='font-heading text-5xl md:text-6xl leading-[1.05] mb-7 text-foreground'>
          {config.content.welcomeTitle}
        </h2>

        <Divider className='mb-8' />

        <p className='font-heading italic text-xl md:text-2xl leading-relaxed text-foreground/85 mb-9 px-2'>
          {config.content.welcomeText}
        </p>

        <p className='text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-primary/85'>
          {closingPhrase[region]}
        </p>

        <BotanicalSprig
          className='mx-auto mt-10 text-primary/55 rotate-180'
          aria-hidden
        />
      </motion.div>
    </Section>
  );
}

function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className='w-20 h-px bg-primary/30' />
      <span className='w-1.5 h-1.5 rounded-full bg-primary/40' />
      <span className='w-20 h-px bg-primary/30' />
    </div>
  );
}

function BotanicalSprig({
  className = '',
}: {
  className?: string;
  'aria-hidden'?: boolean;
}) {
  return (
    <svg
      width='150'
      height='26'
      viewBox='0 0 150 26'
      fill='none'
      className={className}
      aria-hidden
    >
      <g stroke='currentColor' strokeWidth='1' strokeLinecap='round'>
        <line x1='25' y1='13' x2='62' y2='13' />
        <line x1='88' y1='13' x2='125' y2='13' />
      </g>
      <g fill='currentColor'>
        <circle cx='75' cy='13' r='2.4' />
        <circle cx='75' cy='13' r='4.5' fill='none' stroke='currentColor' strokeWidth='0.8' opacity='0.55' />
      </g>
      <g fill='currentColor'>
        <ellipse cx='20' cy='13' rx='2.2' ry='4.5' transform='rotate(-30 20 13)' opacity='0.95' />
        <ellipse cx='14' cy='17' rx='1.6' ry='3.4' transform='rotate(-55 14 17)' opacity='0.7' />
        <ellipse cx='10' cy='10' rx='1.6' ry='3.4' transform='rotate(-15 10 10)' opacity='0.6' />
        <ellipse cx='130' cy='13' rx='2.2' ry='4.5' transform='rotate(30 130 13)' opacity='0.95' />
        <ellipse cx='136' cy='17' rx='1.6' ry='3.4' transform='rotate(55 136 17)' opacity='0.7' />
        <ellipse cx='140' cy='10' rx='1.6' ry='3.4' transform='rotate(15 140 10)' opacity='0.6' />
      </g>
    </svg>
  );
}

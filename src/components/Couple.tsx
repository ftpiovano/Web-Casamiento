'use client';

import Image from 'next/image';
import { User } from 'lucide-react';
import { Section, Typography } from './Base';
import { siteConfig } from '@/site.config';
import { useLanguage } from '@/context/LanguageContext';

/**
 * "The Couple" section — two portrait placeholders, a botanical
 * divider, and the bride's-friend story localized to the active region.
 * @return {JSX.Element} The rendered couple section.
 */
export function Couple() {
  const { region, config } = useLanguage();
  const groom = siteConfig.names.groom[region];
  const bride = siteConfig.names.bride;
  const { bride: bridePhoto, groom: groomPhoto } = siteConfig.couplePhotos;

  return (
    <Section id='couple' className='bg-background'>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 md:gap-24 mb-12'>
        <Portrait photo={bridePhoto} alt={bride} name={bride} />
        <Portrait photo={groomPhoto} alt={groom} name={groom} />
      </div>

      <BotanicalDivider />

      <Typography as='h2' className='!mt-10 !mb-8'>
        {config.content.coupleTitle}
      </Typography>

      <div className='max-w-3xl mx-auto text-center'>
        <p className='italic text-foreground/75 leading-relaxed text-base md:text-lg'>
          “{config.content.coupleStory}”
        </p>
        <p className='mt-6 text-xs uppercase tracking-[0.25em] text-foreground/55'>
          — {config.content.coupleAttribution}
        </p>
      </div>
    </Section>
  );
}

function Portrait({
  photo,
  alt,
  name,
}: {
  photo: { src: string; width: number; height: number };
  alt: string;
  name: string;
}) {
  const hasPhoto = Boolean(photo.src);
  return (
    <figure className='flex flex-col items-center'>
      <div className='w-52 sm:w-60 md:w-72 rounded-[2.25rem] overflow-hidden bg-accent/15 ring-1 ring-accent/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]'>
        {hasPhoto ? (
          <Image
            src={photo.src}
            alt={alt}
            width={photo.width}
            height={photo.height}
            sizes='(min-width: 768px) 288px, 240px'
            className='block w-full h-auto'
          />
        ) : (
          <div className='aspect-[4/5] flex items-center justify-center text-primary/35'>
            <User size={64} strokeWidth={1} />
          </div>
        )}
      </div>
      <figcaption className='mt-5 text-sm uppercase tracking-[0.3em] text-foreground/65'>
        {name}
      </figcaption>
    </figure>
  );
}

function BotanicalDivider() {
  return (
    <div className='flex justify-center' aria-hidden>
      <svg
        width='110'
        height='44'
        viewBox='0 0 110 44'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.1'
        strokeLinecap='round'
        className='text-primary/45'
      >
        <line x1='55' y1='6' x2='55' y2='40' />
        <circle cx='55' cy='4' r='1.6' fill='currentColor' stroke='none' />
        <path d='M55 14 C 49 14, 42 13, 36 18 Q 33 21, 36 24' />
        <path d='M55 22 C 47 22, 39 21, 30 28' />
        <path d='M55 30 C 50 31, 44 32, 40 36' />
        <path d='M55 14 C 61 14, 68 13, 74 18 Q 77 21, 74 24' />
        <path d='M55 22 C 63 22, 71 21, 80 28' />
        <path d='M55 30 C 60 31, 66 32, 70 36' />
        <ellipse cx='34' cy='20' rx='1.6' ry='3.2' transform='rotate(-35 34 20)' fill='currentColor' stroke='none' opacity='0.85' />
        <ellipse cx='76' cy='20' rx='1.6' ry='3.2' transform='rotate(35 76 20)' fill='currentColor' stroke='none' opacity='0.85' />
        <ellipse cx='28' cy='28' rx='1.6' ry='3.2' transform='rotate(-25 28 28)' fill='currentColor' stroke='none' opacity='0.7' />
        <ellipse cx='82' cy='28' rx='1.6' ry='3.2' transform='rotate(25 82 28)' fill='currentColor' stroke='none' opacity='0.7' />
      </svg>
    </div>
  );
}

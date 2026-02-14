'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Section, Typography } from './Base';

/**
 * Welcome section component providing a localized introductory message.
 * @return {JSX.Element} The rendered welcome section.
 */
export function Welcome() {
  const { config } = useLanguage();

  return (
    <Section id='welcome' className='bg-background'>
      <div className='max-w-2xl mx-auto text-center space-y-6'>
        <Typography as='h2'>
          {config.content.welcomeTitle}
        </Typography>
        <Typography className='text-lg'>
          {config.content.welcomeText}
        </Typography>
        <Typography className='italic opacity-60'>
          {config.region === 'br' ? 'Sua presença é o nosso maior presente!' : '¡Su presencia es nuestro mayor regalo!'}
        </Typography>
      </div>
    </Section>
  );
}

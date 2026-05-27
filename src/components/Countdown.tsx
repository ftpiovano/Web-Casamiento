'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/site.config';
import { Typography } from './Base';

/**
 * Countdown component that displays time remaining until the wedding event.
 * @return {JSX.Element} The rendered countdown.
 */
export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(siteConfig.eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section className='pt-20 pb-10 bg-accent/5 border-y border-accent/10'>
      <div className='container max-w-4xl mx-auto px-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {items.map((item) => (
            <div key={item.label} className='flex flex-col items-center'>
              <span className='text-4xl md:text-6xl font-heading text-primary mb-2'>
                {String(item.value).padStart(2, '0')}
              </span>
              <span className='text-xs uppercase tracking-widest text-foreground/40 font-medium'>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Welcome } from '@/components/Welcome';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { TravelTips } from '@/components/TravelTips';
import { GiftGrid } from '@/components/GiftGrid';
import { RSVPForm } from '@/components/RSVPForm';
import { Guestbook } from '@/components/Guestbook';
import { SectionProvider, useSection } from '@/context/SectionContext';

function ActiveSection() {
  const { activeSection } = useSection();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeSection]);

  const content =
    activeSection === 'home' ? (
      <>
        <Hero />
        <Welcome />
        <Countdown />
      </>
    ) : activeSection === 'couple' ? (
      <section
        id='couple'
        className='min-h-screen flex items-center justify-center bg-background pt-32 pb-20'
      >
        <h2 className='text-4xl font-heading'>The Couple</h2>
      </section>
    ) : activeSection === 'ceremony' ? (
      <EventDetails />
    ) : activeSection === 'travel' ? (
      <TravelTips />
    ) : activeSection === 'gifts' ? (
      <GiftGrid />
    ) : activeSection === 'rsvp' ? (
      <RSVPForm />
    ) : (
      <Guestbook />
    );

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <SectionProvider>
      <main className='relative'>
        <Navbar />
        <ActiveSection />
      </main>
    </SectionProvider>
  );
}

'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Welcome } from '@/components/Welcome';
import { Countdown } from '@/components/Countdown';
import { Couple } from '@/components/Couple';
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
        <Countdown />
        <Welcome />
      </>
    ) : activeSection === 'couple' ? (
      <Couple />
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

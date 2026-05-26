'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SectionKey =
  | 'home'
  | 'couple'
  | 'ceremony'
  | 'travel'
  | 'gifts'
  | 'rsvp'
  | 'messages';

interface SectionContextType {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const ctx = useContext(SectionContext);
  if (ctx === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return ctx;
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { siteConfig } from '@/site.config';

type RegionKey = 'br' | 'ar' | 'en';

interface LanguageContextType {
  region: RegionKey;
  setRegion: (region: RegionKey) => void;
  config: typeof siteConfig.regions.br;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Provider component for managing language and region state.
 * @param {Object} props component properties.
 * @return {JSX.Element} The rendered provider.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<RegionKey>('br');

  useEffect(() => {
    const savedRegion = localStorage.getItem('wedding_region') as RegionKey;
    if (savedRegion && (savedRegion === 'br' || savedRegion === 'ar' || savedRegion === 'en')) {
      setRegionState(savedRegion);
    }
  }, []);

  const setRegion = (newRegion: RegionKey) => {
    setRegionState(newRegion);
    localStorage.setItem('wedding_region', newRegion);
  };

  const value = {
    region,
    setRegion,
    config: siteConfig.regions[region],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/**
 * Hook to use the language context.
 * @return {LanguageContextType} The context value.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

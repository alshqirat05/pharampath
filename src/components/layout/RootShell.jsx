'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageProvider';
import SmoothScrollProvider from '@/motion/SmoothScrollProvider';
import ScrollTravelCompanion from '@/motion/ScrollTravelCompanion';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import AssistantFloatingLauncher from './AssistantFloatingLauncher';

/**
 * Client shell wrapping language context, smooth scrolling, scroll-traveling companion,
 * persistent header, main content slot, floating assistant launcher, and minimal footer.
 */
export default function RootShell({ children }) {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <ScrollTravelCompanion />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <AssistantFloatingLauncher />
        <SiteFooter />
      </SmoothScrollProvider>
    </LanguageProvider>
  );
}

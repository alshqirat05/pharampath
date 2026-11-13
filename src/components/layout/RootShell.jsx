'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import { AssistantWidgetProvider } from '@/context/AssistantWidgetContext';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import AssistantFloatingLauncher from './AssistantFloatingLauncher';

/**
 * Client shell wrapping language context, theme provider, persistent header,
 * main content slot, floating assistant launcher, and minimal footer.
 */
export default function RootShell({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AssistantWidgetProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <AssistantFloatingLauncher />
          <SiteFooter />
        </AssistantWidgetProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

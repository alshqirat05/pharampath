'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AssistantWidgetContext = createContext({
  isOpen: false,
  openAssistant: () => {},
  closeAssistant: () => {},
  toggleAssistant: () => {},
});

/**
 * Provides global open/close state for the floating drug-info chatbot widget
 * so any page CTA or the floating launcher can open it without leaving the page.
 */
export function AssistantWidgetProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAssistant = useCallback(() => setIsOpen(true), []);
  const closeAssistant = useCallback(() => setIsOpen(false), []);
  const toggleAssistant = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <AssistantWidgetContext.Provider
      value={{ isOpen, openAssistant, closeAssistant, toggleAssistant }}
    >
      {children}
    </AssistantWidgetContext.Provider>
  );
}

export function useAssistantWidget() {
  return useContext(AssistantWidgetContext);
}


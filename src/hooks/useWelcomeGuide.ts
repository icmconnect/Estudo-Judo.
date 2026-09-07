import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dojo_digital_welcome_guide_seen_v1';

export function useWelcomeGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSeen, setIsSeen] = useState(true); // Default to true until checked

  useEffect(() => {
    // Check localStorage on mount
    const seen = localStorage.getItem(STORAGE_KEY) === 'true';
    setIsSeen(seen);
    
    // Only auto-open if not seen yet
    if (!seen) {
      // Small delay to ensure smooth rendering and not colliding with other initial mounts
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const openGuide = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeGuide = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsSeen(true);
  }, []);

  return {
    isOpen,
    isSeen,
    openGuide,
    closeGuide
  };
}

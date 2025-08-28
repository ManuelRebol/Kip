import { useState, useEffect } from 'react';

export const useMobile = (breakpoint: number = 1227): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const updateMatches = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    setMatches(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches);
    } else {
      mediaQuery.addListener(updateMatches);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatches);
      } else {
        mediaQuery.removeListener(updateMatches);
      }
    };
  }, [query]);

  return matches;
};
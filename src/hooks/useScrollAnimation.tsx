'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add animation classes
              entry.target.classList.add('animate-fade-in', 'animate-slide-up');
              // Stop observing after animation
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        // Check if element exists and observer is available
        if (el && observerRef.current) {
          try {
            observerRef.current.observe(el);
          } catch (error) {
            console.warn('Failed to observe element:', error);
          }
        }
      });
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      
      // Safely disconnect observer
      if (observerRef.current) {
        try {
          observerRef.current.disconnect();
        } catch (error) {
          console.warn('Failed to disconnect observer:', error);
        }
        observerRef.current = null;
      }
    };
  }, []);
}
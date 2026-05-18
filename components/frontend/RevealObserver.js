'use client';

import { useEffect } from 'react';

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { frontWorks } from '@/lib/front-gallery';

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  parallaxFactor?: number;
};

function RevealItem({ children, className = '', parallaxFactor = 0.02 }: RevealItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (node) observer.unobserve(node);
    };
  }, []);

  const offset = inView ? scrollY * parallaxFactor : 40;

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        inView ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function FrontGallery() {
  return (
    <section className="bg-gradient-to-b from-background via-[#e3c5a5] to-accent/80 py-16 pb-32 md:pb-48">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4">
        {frontWorks.map((work, index) => (
          <RevealItem
            key={work.src + index}
            className={`relative ${work.width} ${work.align === 'right' ? 'ml-auto' : ''}`}
            parallaxFactor={0.01 + index * 0.002}
          >
            <div className="group relative w-full overflow-visible">
              {/* Soft depth shadow (Option 1) */}
              <div
                className="pointer-events-none absolute inset-0 rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.25)] opacity-40 transition-opacity duration-500 ease-out group-hover:opacity-80"
                aria-hidden="true"
              />

              <div className="relative w-full overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  <Image src={work.src} alt={work.alt} fill className="object-cover" />
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}

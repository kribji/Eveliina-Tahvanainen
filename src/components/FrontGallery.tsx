'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { frontWorks, type FrontWork } from '@/lib/front-gallery';

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  index?: number;
};

function RevealItem({ children, className = '', index = 0 }: RevealItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IO isn't available, show immediately (rare)
    if (!('IntersectionObserver' in globalThis)) {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // small stagger so items reveal one-by-one
          window.setTimeout(() => setInView(true), index * 90);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        // reveal a bit before the item is fully in view (tune if needed)
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{ transform: `translate3d(0, ${inView ? 0 : 18}px, 0)` }}
      className={`will-change-transform transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${inView ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'}
        ${className}`}
    >
      {children}
    </div>
  );
}

export default function FrontGallery() {
  return (
    <section className="py-16 pb-32 md:pb-48">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4">
        {frontWorks.map((work: FrontWork, index) => (
          <RevealItem
            key={`${work.src}-${index}`}
            index={index}
            className={`relative ${work.width} ${work.align === 'right' ? 'ml-auto' : ''}`}
          >
            <Link
              href={work.href ?? '/exhibition'}
              className="group relative block w-full cursor-pointer overflow-visible"
            >
              {/* Soft depth shadow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.25)] opacity-40 transition-opacity duration-500 ease-out group-hover:opacity-80"
                aria-hidden="true"
              />

              <div className="relative w-full overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 800px, 92vw"
                  />

                  {/* CAPTION BAND */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#FFF9F3]/90 px-3 py-2 backdrop-blur-[2px]">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="min-w-0 truncate text-[0.7rem] tracking-[0.18em] text-[#4A3C30] lowercase">
                        {work.title ?? work.alt}
                      </p>

                      {work.year ? (
                        <p className="shrink-0 text-[0.7rem] tracking-[0.18em] text-[#4A3C30]/70">
                          {work.year}
                        </p>
                      ) : null}
                    </div>

                    {work.caption || work.description ? (
                      <p className="mt-1 line-clamp-2 text-[0.75rem] text-[#4A3C30]/70">
                        {work.caption ?? work.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}

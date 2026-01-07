'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { workCategories } from '@/lib/work';

type Category = {
  slug: string;
  title: string;
  image: string;
};

const SCROLL_SPEED = 520; // px/sec

export default function WorkCategoryCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dirRef = useRef<-1 | 0 | 1>(0);
  const lastTsRef = useRef<number>(0);
  const loopWidthRef = useRef<number>(0);

  const [scrollable, setScrollable] = useState(false);

  const baseCategories: Category[] = useMemo(
    () => [
      ...workCategories.map((c) => ({
        slug: String(c.slug),
        title: c.title,
        image: c.image,
      })),
      { slug: 'bowls', title: 'bowls', image: '/bowls.jpeg' },
      { slug: 'cups', title: 'cups', image: '/08.jpeg' },
      { slug: 'plates', title: 'plates', image: '/bowls2.jpeg' },
      { slug: 'vases', title: 'vases', image: '/sculptures2.jpeg' },
      { slug: 'objects', title: 'objects', image: '/06.jpeg' },
    ],
    [],
  );

  // looped for desktop carousel
  const loopedCategories = useMemo(
    () => [...baseCategories, ...baseCategories, ...baseCategories],
    [baseCategories],
  );

  const recompute = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const loopWidth = el.scrollWidth / 3;
    loopWidthRef.current = loopWidth;
    setScrollable(el.scrollWidth > el.clientWidth + 2);
  };

  const wrapIfNeeded = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const loopWidth = loopWidthRef.current;
    if (!loopWidth) return;

    const leftBoundary = loopWidth * 0.5;
    const rightBoundary = loopWidth * 1.5;

    if (el.scrollLeft < leftBoundary) el.scrollLeft += loopWidth;
    if (el.scrollLeft > rightBoundary) el.scrollLeft -= loopWidth;
  };

  const stopScroll = () => {
    dirRef.current = 0;
    lastTsRef.current = 0;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const startScroll = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!scrollable) return;

    const nextDir: -1 | 1 = direction === 'right' ? 1 : -1;
    if (dirRef.current === nextDir && rafRef.current) return;

    dirRef.current = nextDir;
    lastTsRef.current = 0;

    if (rafRef.current) return;

    const tick = (ts: number) => {
      const node = scrollerRef.current;
      if (!node || dirRef.current === 0) {
        rafRef.current = null;
        return;
      }

      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      node.scrollLeft += dirRef.current * SCROLL_SPEED * dt;
      wrapIfNeeded();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    recompute();

    const el = scrollerRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      recompute();
      const loopWidth = loopWidthRef.current;
      if (loopWidth) el.scrollLeft = loopWidth;
    });

    const onResize = () => {
      recompute();
      const loopWidth = loopWidthRef.current;
      if (loopWidth) el.scrollLeft = loopWidth;
    };

    const ro = new ResizeObserver(() => recompute());
    window.addEventListener('resize', onResize);
    ro.observe(el);

    return () => {
      stopScroll();
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="bg-[#FFF9F3] py-10 text-[#4A3C30]">
      {/* MOBILE: stacked editorial tiles */}
      <div className="md:hidden">
        {baseCategories.map((category) => (
          <Link key={category.slug} href={`/work/${category.slug}`} className="block">
            <figure className="font-bold relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-[#FFF9F3]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
                sizes="100vw"
              />

              {/* Always-on label for touch */}
              <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
                <span className=" bg-white/80 px-5 py-2 text-[0.85rem] lowercase tracking-[0.14em] text-[#4A3C30] backdrop-blur-[2px] md:text-[0.95rem]">
                  {category.title}
                </span>
              </div>
            </figure>
          </Link>
        ))}
      </div>

      {/* DESKTOP: endless carousel */}
      <div className="relative hidden md:block">
        {scrollable && (
          <div
            className="absolute inset-y-0 left-0 z-20 w-16"
            onMouseEnter={() => startScroll('left')}
            onMouseLeave={stopScroll}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 select-none text-3xl opacity-30">
              ‹
            </div>
          </div>
        )}

        {scrollable && (
          <div
            className="absolute inset-y-0 right-0 z-20 w-16"
            onMouseEnter={() => startScroll('right')}
            onMouseLeave={stopScroll}
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none text-3xl opacity-30">
              ›
            </div>
          </div>
        )}

        <div
          ref={scrollerRef}
          onScroll={() => {
            wrapIfNeeded();
            recompute();
          }}
          className="flex gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopedCategories.map((category, index) => (
            <Link
              key={`${category.slug}-${index}`}
              href={`/work/${category.slug}`}
              className="group relative block shrink-0"
              onMouseLeave={stopScroll}
            >
              <figure className="relative h-[94vh] min-h-[680px] max-h-[1060px] w-[70vw] md:w-[50vw] lg:w-[44vw] overflow-hidden bg-[#FFF9F3]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, (min-width: 768px) 50vw, 70vw"
                />

                <div className="absolute inset-0 bg-white/10" aria-hidden="true" />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/0 opacity-0 transition-all duration-700 ease-out group-hover:bg-white/45 group-hover:opacity-100">
                  <span className="text-3xl lowercase tracking-[0.14em] md:text-4xl">
                    {category.title}
                  </span>
                </div>
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  image?: { url: string } | null;
};

type Category = {
  handle: string;
  title: string;
  imageUrl: string | null;
};

const SCROLL_SPEED = 520; // px/sec

// ✅ Your preferred order (by handle)
const PREFERRED_CATEGORY_ORDER = [
  'mugs',
  'bowls',
  'tableware',
  'vases',
  'glass',
  'sculptures',
] as const;

function sortByPreferredOrder<T extends { handle: string }>(items: T[]) {
  const orderIndex = new Map<string, number>(
    PREFERRED_CATEGORY_ORDER.map((h, i) => [h.toLowerCase(), i]),
  );

  // Stable sort: preferred first, unknown after (keep original relative order for unknowns)
  return [...items]
    .map((item, originalIndex) => ({ item, originalIndex }))
    .sort((a, b) => {
      const ai = orderIndex.get(a.item.handle.toLowerCase());
      const bi = orderIndex.get(b.item.handle.toLowerCase());

      const aKnown = ai !== undefined;
      const bKnown = bi !== undefined;

      if (aKnown && bKnown) return (ai as number) - (bi as number);
      if (aKnown) return -1;
      if (bKnown) return 1;

      // both unknown -> preserve original order
      return a.originalIndex - b.originalIndex;
    })
    .map((x) => x.item);
}

export default function WorkCategoryCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dirRef = useRef<-1 | 0 | 1>(0);
  const lastTsRef = useRef<number>(0);
  const loopWidthRef = useRef<number>(0);

  const [scrollable, setScrollable] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/collections', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error(`Failed to load collections (${res.status})`);

        const data = (await res.json()) as
          | ShopifyCollection[]
          | { collections?: ShopifyCollection[] };
        const list = Array.isArray(data) ? data : (data.collections ?? []);

        const mapped: Category[] = list
          .filter((c) => c?.handle && c?.title)
          .map((c) => ({
            handle: c.handle,
            title: c.title,
            imageUrl: c.image?.url ?? null,
          }));

        // ✅ Apply preferred order here
        const ordered = sortByPreferredOrder(mapped);

        if (!cancelled) setCategories(ordered);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load collections');
          setCategories([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const loopedCategories = useMemo(() => {
    if (categories.length === 0) return [];
    return [...categories, ...categories, ...categories];
  }, [categories]);

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
    const el = scrollerRef.current;
    if (!el) return;

    recompute();

    requestAnimationFrame(() => {
      recompute();
      const loopWidth = loopWidthRef.current;
      if (loopWidth) el.scrollLeft = loopWidth;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="bg-[#FFFFFF] py-10 text-text">
        <div className="px-4 text-sm opacity-70">Loading categories…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#FFFFFF] py-10 text-text">
        <div className="px-4 text-sm opacity-70">Couldn’t load categories: {error}</div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="bg-[#FFFFFF] py-10 text-text">
      {/* MOBILE */}
      <div className="md:hidden">
        {categories.map((category) => (
          <Link key={category.handle} href={`/shop/${category.handle}`} className="block">
            <figure className="font relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-[#FFF9F3]">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[#FFF9F3]" aria-hidden="true" />
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
                <span className=" bg-white/80 px-5 py-2 text-[0.85rem] lowercase tracking-[0.14em] text-text backdrop-blur-[2px] md:text-[0.95rem]">
                  {category.title}
                </span>
              </div>
            </figure>
          </Link>
        ))}
      </div>

      {/* DESKTOP */}
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
              key={`${category.handle}-${index}`}
              href={`/shop/${category.handle}`}
              className="group relative block shrink-0"
              onMouseLeave={stopScroll}
            >
              <figure className="relative h-[94vh] min-h-[680px] max-h-[1060px] w-[70vw] overflow-hidden bg-[#FFFFFF] md:w-[50vw] lg:w-[44vw]">
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 44vw, (min-width: 768px) 50vw, 70vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#FFFFFF]" aria-hidden="true" />
                )}

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

// src/app/shop/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Collection = {
  id: string;
  handle: string;
  title: string;
  image: { url: string; altText: string | null } | null;
};

// preferred order
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
      return a.originalIndex - b.originalIndex;
    })
    .map((x) => x.item);
}

export default function ShopPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/collections');
        const json = await res.json();
        setCollections(json.collections ?? []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const orderedCollections = useMemo(() => {
    return sortByPreferredOrder(collections);
  }, [collections]);

  if (loading) {
    return <main className="pt-28 px-6">Loading…</main>;
  }

  return (
    <main className="bg-[#FFFFF] text-text">
      <section className="pt-20 md:pt-28 flex flex-col gap-12 md:gap-16 lg:gap-20">
        {orderedCollections.map((c) => (
          <Link key={c.id} href={`/shop/${c.handle}`} className="group block">
            <figure
              className="
                relative mx-auto overflow-hidden
                w-[92vw] sm:w-[86vw] md:w-[72vw] lg:w-[62vw] xl:w-[56vw]
                h-[78vh] min-h-[560px] max-h-[900px]
              "
            >
              <Image
                src={c.image?.url ?? '/placeholder.jpg'}
                alt={c.image?.altText ?? c.title}
                fill
                className="
                  object-cover object-center
                  scale-[0.92]
                  transition-transform duration-[1200ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  md:group-hover:scale-[0.96]
                "
                sizes="(min-width: 1280px) 62vw,
                       (min-width: 1024px) 68vw,
                       (min-width: 768px) 78vw,
                       (min-width: 640px) 90vw,
                       96vw"
              />

              <div
                className="
                  absolute inset-0 bg-white/0 transition-all duration-700
                  md:group-hover:bg-white/30
                "
                aria-hidden="true"
              />

              <div
                className="
                  pointer-events-none absolute inset-0
                  flex items-end md:items-center justify-center
                  pb-6 md:pb-0
                  opacity-100 md:opacity-0
                  transition-all duration-700
                  md:group-hover:opacity-100
                "
              >
                <span
                  className="
                    bg-white/90 px-4 py-1.5
                    text-[0.7rem] md:text-3xl lowercase tracking-[0.18em]
                    text-text md:bg-transparent md:px-0 md:py-0
                  "
                >
                  {c.title}
                </span>
              </div>

              <div
                className="
                  pointer-events-none absolute bottom-6 right-6
                  text-xl opacity-0 transition-opacity duration-500
                  md:group-hover:opacity-35
                "
              >
                →
              </div>
            </figure>
          </Link>
        ))}
      </section>
    </main>
  );
}

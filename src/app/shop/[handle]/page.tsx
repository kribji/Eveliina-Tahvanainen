// src/app/shop/[handle]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type ShopifyImage = { url: string; altText: string | null };

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  images?: { nodes: ShopifyImage[] } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

export default function CollectionPage() {
  const params = useParams<{ handle?: string }>();
  const handle = params?.handle ?? '';

  const [items, setItems] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;

    (async () => {
      try {
        const res = await fetch(`/api/collection/${handle}`);
        const json = await res.json();

        if (!json.ok) {
          console.error(json.error);
          setItems([]);
          return;
        }

        setItems(json.collection?.products?.nodes ?? []);
      } catch (e) {
        console.error(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [handle]);

  if (!handle) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 space-y-4">
        <p className="text-sm text-text/70">Invalid category.</p>
      </main>
    );
  }

  if (loading) {
    return <main className="mx-auto max-w-5xl px-4 py-16">Loading…</main>;
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 space-y-4">
        <p className="text-sm text-text/70">No works found in this category yet.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-8">
        <Link
          href="/shop"
          className="text-xs tracking-[0.18em] text-text/60 underline-offset-4 hover:underline"
        >
          ←
        </Link>
      </div>

      <section className="grid gap-8 md:grid-cols-3">
        {items.map((p) => {
          const imgs = p.images?.nodes ?? [];

          const baseUrl = p.featuredImage?.url ?? imgs[0]?.url ?? '/placeholder.jpg';
          const baseAlt = p.featuredImage?.altText ?? imgs[0]?.altText ?? p.title;

          const hoverUrl = imgs[1]?.url ?? null;
          const hoverAlt = imgs[1]?.altText ?? p.title;

          const hasHoverImage = Boolean(hoverUrl);

          const amount = Number(p.priceRange.minVariantPrice.amount);
          const priceLabel = Number.isFinite(amount)
            ? `${amount.toLocaleString('no-NO')} EUR`
            : 'on request';

          return (
            <Link key={p.id} href={`/shop/${handle}/${p.handle}`} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-background/60">
                {/* Base image */}
                <Image
                  src={baseUrl}
                  alt={baseAlt}
                  fill
                  className={[
                    'object-cover transition-transform duration-700 ease-out',
                    hasHoverImage
                      ? 'transition-opacity duration-500 group-hover:opacity-0'
                      : 'group-hover:scale-[1.06]',
                  ].join(' ')}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />

                {/* Hover image: only render if we actually have image #2 */}
                {hasHoverImage && (
                  <Image
                    src={hoverUrl as string}
                    alt={hoverAlt}
                    fill
                    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-4">
                <p className="min-w-0 truncate text-[0.75rem] tracking-[0.16em] text-text/75 lowercase">
                  {p.title}
                </p>
                <p className="shrink-0 text-[0.75rem] tracking-[0.16em] text-text/60">
                  {priceLabel}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

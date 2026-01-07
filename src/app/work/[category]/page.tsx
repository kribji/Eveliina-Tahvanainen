'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory, products } from '@/lib/products';

export default function CategoryPage() {
  const params = useParams<{ category?: string }>();
  const category = params?.category ?? '';

  const items = category ? getProductsByCategory(category) : [];

  if (!category) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 space-y-4">
        <p className="text-sm text-text/70">Invalid category.</p>
      </main>
    );
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
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="text-xs tracking-[0.18em] text-text/60 underline-offset-4 hover:underline"
        >
          ←
        </Link>
      </div>

      <section className="grid gap-8 md:grid-cols-3">
        {items.map((product) => (
          <Link key={product.id} href={`/work/${category}/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-background/60">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage || product.image}
                alt={product.title}
                fill
                className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            {/* info row */}
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <p className="min-w-0 truncate text-[0.75rem] tracking-[0.16em] text-text/75 lowercase">
                {product.title}
              </p>

              <p className="shrink-0 text-[0.75rem] tracking-[0.16em] text-text/60">
                {typeof product.price === 'number'
                  ? `${product.price.toLocaleString('no-NO')} EUR`
                  : 'on request'}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory, products } from '@/lib/products';

export default function CategoryPage() {
  // Read params from the URL on the client
  const params = useParams<{ category?: string }>();
  const category = params?.category ?? '';

  console.log('useParams() =>', params);
  console.log('category from params:', category);
  console.log(
    'all product categories:',
    products.map((p) => p.category),
  );

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
          href="/work"
          className="text-xs tracking-body text-text/60 underline-offset-4 hover:underline"
        >
          ←
        </Link>
      </div>
      <section className="grid gap-8 md:grid-cols-3">
        {items.map((product) => (
          <Link key={product.id} href={`/work/${category}/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage}
                alt={product.title}
                fill
                className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';

export default function ProductPage() {
  const params = useParams<{ category?: string; slug?: string }>();

  const category = params?.category ?? '';
  const slug = params?.slug ?? '';

  // If slug missing, show a simple message
  if (!slug) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-sm text-text/70">Invalid product.</p>
      </main>
    );
  }

  const product = getProductBySlug(slug);

  // If product not found, show a not-found style message
  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-sm text-text/70">This piece could not be found.</p>
      </main>
    );
  }

  // (Optional) if URL category doesn't match product.category, you can ignore or show a back link
  const showBackLink = !!category;

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      {showBackLink && (
        <div className="mb-6">
          <Link
            href={`/work/${category}`}
            className="text-xs tracking-body text-text/60 underline-offset-4 hover:underline"
          >
            ← Back to {category}
          </Link>
        </div>
      )}

      <div className="grid gap-10 md:grid-cols-[3fr,2fr] items-start">
        {/* Left: main image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-background/60">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>

        {/* Right: details */}
        <section className="space-y-4">
          <h1 className="tracking-header text-2xl lowercase text-text md:text-3xl">
            {product.title}
          </h1>

          <p className="text-xs uppercase tracking-[0.15em] text-text/60">{product.category}</p>

          {/* Placeholder description for now */}
          <p className="text-sm text-text/80">
            Description coming soon. This is where you can add materials, dimensions, techniques,
            edition info, or care instructions for the piece.
          </p>

          {/* Placeholder for future price + add-to-bag */}
          <div className="mt-6 flex items-center gap-4">
            {/* <span className="text-base font-medium text-text">
              €XXX
            </span> */}
            <button
              type="button"
              className="rounded-full border border-text px-6 py-2 text-xs tracking-body uppercase text-text hover:bg-text hover:text-background transition-colors"
            >
              Add to bag
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

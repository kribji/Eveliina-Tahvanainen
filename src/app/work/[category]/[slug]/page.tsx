'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductPage() {
  const { addToCart } = useCart();

  const params = useParams<{ category?: string; slug?: string }>();
  const category = params?.category ?? '';
  const slug = params?.slug ?? '';

  if (!slug) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-sm text-text/70">Invalid product.</p>
      </main>
    );
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-sm text-text/70">This piece could not be found.</p>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const showBackLink = !!category;

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      {showBackLink && (
        <div className="mb-2">
          <Link
            href={`/work/${category}`}
            className="text-xs tracking-[0.18em] text-text/60 underline-offset-4 hover:underline"
          >
            ← {category}
          </Link>
        </div>
      )}

      {/* MAIN LAYOUT: left = images, right = text */}
      <section className="flex flex-col gap-10 md:flex-row md:items-start">
        {/* Left column: stacked images */}
        <div className="w-full space-y-6 md:w-[60%]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/60">
            <Image src={product.image} alt={product.title} fill className="object-cover" />
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/60">
            <Image
              src={product.hoverImage || product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right column */}
        <section className="w-full space-y-6 md:w-[40%]">
          {/* Title: smaller + tighter tracking + single line */}
          <h1 className="text-[0.95rem] lowercase tracking-[0.22em] text-text md:text-[1.05rem] md:whitespace-nowrap md:truncate">
            {product.title}
          </h1>

          {/* Category + price row */}
          <div className="flex items-baseline justify-between">
            <p className="text-[0.7rem] tracking-[0.18em] text-text/55 lowercase">
              {product.category}
            </p>
            <p className="text-[0.7rem] tracking-[0.18em] text-text/70">
              {typeof product.price === 'number'
                ? `${product.price.toLocaleString('no-NO')} EUR`
                : 'on request'}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-text/75">{product.description}</p>

          {/* CTA */}
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="
    w-full
    bg-text text-background
    py-3
    text-center text-[0.7rem]
    tracking-[0.25em]
    transition-colors
    hover:bg-text/80
  "
          >
            add to cart
          </button>

          {/* Details block (mock for now) */}
          <div className="space-y-3 border-t border-text/10 pt-6">
            <p className="text-[0.7rem] tracking-[0.22em] text-text/70">details</p>

            <div className="space-y-2 text-sm text-text/70">
              <p>
                <span className="text-text/45">materials:</span> ceramic
              </p>
              <p>
                <span className="text-text/45">dimensions:</span> on request
              </p>
              <p>
                <span className="text-text/45">care:</span> hand wash recommended
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-text/10 pt-10">
          <h2 className="mb-6 text-xs tracking-[0.25em] text-text/70">others also looked at</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.category}/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <Image
                    src={item.hoverImage}
                    alt={item.title}
                    fill
                    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-3 text-xs tracking-[0.15em] text-text/70">{item.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products } from '@/lib/products';

export default function ProductPage() {
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
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-16">
      {showBackLink && (
        <div className="mb-2">
          <Link
            href={`/work/${category}`}
            className="text-xs tracking-body text-text/60 underline-offset-4 hover:underline"
          >
            ← back to {category}
          </Link>
        </div>
      )}

      {/* MAIN LAYOUT: left = images, right = text */}
      <section className="flex flex-col gap-10 md:flex-row md:items-start">
        {/* Left column: stacked images */}
        <div className="w-full md:w-[60%] space-y-6">
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

        {/* Right column: title, description, price, button */}
        <section className="w-full md:w-[40%] space-y-6">
          <h1 className="tracking-[0.35em] text-xl lowercase text-text md:text-2xl">
            {product.title}
          </h1>

          <p className="text-xs tracking-[0.15em] text-text/60">{product.category}</p>

          {/* use description from product data */}
          <p className="text-sm leading-relaxed text-text/80">{product.description}</p>

          {/* price line – only show amount if you’ve added price to Product */}
          <div className="mt-6 flex items-baseline justify-between text-xs tracking-[0.2em] text-text/80">
            <span>price</span>
            <span>
              {product.price ? `${product.price.toLocaleString('no-NO')} EUR` : 'on request'}
            </span>
          </div>

          {/* long brown button */}
          <button
            type="button"
            className="mt-4 w-full bg-[#5f4a3b] py-3 text-center text-[0.7rem] tracking-[0.25em] text-[#f6eee6] transition-colors hover:bg-[#4f3e32]"
          >
            add to cart
          </button>

          {/* materials / details label */}
          <p className="mt-8 text-xs tracking-[0.25em] text-text/70">materials used details</p>
        </section>
      </section>

      {/* OTHERS ALSO LOOKED AT */}
      {related.length > 0 && (
        <section className="border-t border-text/10 pt-10">
          <h2 className="mb-6 text-xs tracking-[0.25em] text-text/70">others also looked at</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/work/${item.category}/${item.slug}`}
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

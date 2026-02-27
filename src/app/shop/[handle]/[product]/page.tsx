'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

/** Shopify types coming from /api/product/[handle] */
type ShopifyOption = { name: string; values: string[] };

type ShopifyVariant = {
  id: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
};

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string | null;
  alt: string;
  images: { url: string; altText: string | null }[];

  // display price (minVariantPrice)
  price: { amount: string; currencyCode: string };

  // fallback (first available variant id)
  variantId: string | null;

  // variants/options
  options: ShopifyOption[];
  colorOptionName: string | null; // e.g. "Color" or "Väri"
  variants: ShopifyVariant[];

  // Metafields
  dimensions: string | null;
  materials: string | null;
  care: string | null;
};

type RelatedProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

export default function ProductPage() {
  const { addToCart } = useCart();

  const params = useParams<{ handle?: string; product?: string }>();
  const collectionHandle = params?.handle ?? '';
  const productHandle = params?.product ?? '';

  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (!productHandle) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product/${productHandle}`);
        const json = await res.json();

        if (!json.ok) {
          console.error(json.error);
          setProduct(null);
          return;
        }

        setProduct(json.product ?? null);
      } catch (e) {
        console.error(e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [productHandle]);

  useEffect(() => {
    if (!collectionHandle) return;
    if (!productHandle) return;

    (async () => {
      try {
        const res = await fetch(`/api/collection/${collectionHandle}`);
        const json = await res.json();

        if (!json.ok) {
          setRelated([]);
          return;
        }

        const nodes: RelatedProduct[] = json.collection?.products?.nodes ?? [];
        const filtered = nodes.filter((p) => p.handle !== productHandle).slice(0, 4);
        setRelated(filtered);
      } catch (e) {
        console.error(e);
        setRelated([]);
      }
    })();
  }, [collectionHandle, productHandle]);

  const { mainImg, secondImg, priceLabel, priceNumber } = useMemo(() => {
    const main = product?.image ?? product?.images?.[0]?.url ?? '/placeholder.jpg';
    const second = product?.images?.[1]?.url ?? main;

    const amount = product ? Number(product.price.amount) : NaN;
    const label = Number.isFinite(amount) ? `${amount.toLocaleString('no-NO')} EUR` : 'on request';

    return { mainImg: main, secondImg: second, priceLabel: label, priceNumber: amount };
  }, [product]);

  const colors = useMemo(() => {
    if (!product?.colorOptionName) return [];
    const opt = product.options?.find((o) => o.name === product.colorOptionName);
    return opt?.values ?? [];
  }, [product]);

  useEffect(() => {
    if (!product?.colorOptionName) {
      setSelectedColor(null);
      return;
    }

    const opt = product.options?.find((o) => o.name === product.colorOptionName);
    const first = opt?.values?.[0] ?? null;

    setSelectedColor((prev) => {
      if (prev && (opt?.values ?? []).includes(prev)) return prev;
      return first;
    });
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;

    if (!product.colorOptionName || !selectedColor) {
      return product.variants?.find((v) => v.availableForSale) ?? product.variants?.[0] ?? null;
    }

    const match =
      product.variants?.find((v) =>
        v.selectedOptions?.some(
          (so) => so.name === product.colorOptionName && so.value === selectedColor,
        ),
      ) ?? null;

    return (
      match ?? product.variants?.find((v) => v.availableForSale) ?? product.variants?.[0] ?? null
    );
  }, [product, selectedColor]);

  if (!productHandle) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-sm text-text/70">Invalid product.</p>
      </main>
    );
  }

  if (loading) {
    return <main className="mx-auto max-w-5xl px-4 py-16">Loading…</main>;
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-sm text-text/70">This piece could not be found.</p>
      </main>
    );
  }

  const canAddToCart = Boolean(selectedVariant?.id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 space-y-14">
      {!!collectionHandle && (
        <div className="mb-2">
          <Link
            href={`/shop/${collectionHandle}`}
            className="text-xs tracking-[0.18em] text-text/60 underline-offset-4 hover:underline"
          >
            ← {collectionHandle}
          </Link>
        </div>
      )}

      <section className="flex flex-col gap-10 md:flex-row md:items-start">
        <div className="w-full space-y-6 md:w-[60%]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/60">
            <Image
              src={mainImg}
              alt={product.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 60vw, 100vw"
            />
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/60">
            <Image
              src={secondImg}
              alt={product.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 60vw, 100vw"
            />
          </div>
        </div>

        <section className="w-full space-y-6 md:w-[40%]">
          <h1 className="text-[0.95rem] lowercase tracking-[0.22em] text-text md:text-[1.05rem] md:whitespace-nowrap md:truncate">
            {product.title}
          </h1>

          <div className="flex items-baseline justify-between">
            <p className="text-[0.7rem] tracking-[0.18em] text-text/55 lowercase">
              {collectionHandle}
            </p>
            <p className="text-[0.7rem] tracking-[0.18em] text-text/70">{priceLabel}</p>
          </div>

          <p className="text-sm leading-relaxed text-text/75">{product.description}</p>

          {colors.length > 0 && (
            <div className="space-y-2">
              <p className="text-[0.7rem] tracking-[0.22em] text-text/70">
                color{selectedColor ? `: ${selectedColor}` : ''}
              </p>

              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const active = c === selectedColor;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-2 text-[0.7rem] tracking-[0.18em] border transition ${
                        active
                          ? 'border-text bg-text text-background'
                          : 'border-text/20 hover:border-text/50'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!canAddToCart}
            onClick={() => {
              const merchId = selectedVariant?.id ?? product.variantId;
              if (!merchId) return;

              addToCart(
                {
                  id: product.id,
                  slug: product.handle,
                  title: product.title,
                  image: product.image ?? product.images?.[0]?.url ?? '/placeholder.jpg',
                  merchandiseId: merchId,
                  price: selectedVariant
                    ? Number(selectedVariant.price.amount)
                    : Number.isFinite(priceNumber)
                      ? priceNumber
                      : 0,
                  selectedColor: selectedColor ?? undefined,
                } as any,
                1,
              );
            }}
            className={`w-full py-3 text-center text-[0.7rem] tracking-[0.25em] transition-colors ${
              canAddToCart
                ? 'bg-text text-background hover:bg-text/80'
                : 'bg-text/30 text-background/70 cursor-not-allowed'
            }`}
          >
            {canAddToCart ? 'add to cart' : 'unavailable'}
          </button>

          <div className="space-y-3 border-t border-text/10 pt-6">
            <p className="text-[0.7rem] tracking-[0.22em] text-text/70">details</p>

            <div className="space-y-2 text-sm text-text/70">
              <p>
                <span className="text-text/45">materials:</span> {product.materials ?? 'on request'}
              </p>
              <p>
                <span className="text-text/45">dimensions:</span>{' '}
                {product.dimensions ?? 'on request'}
              </p>
              <p>
                <span className="text-text/45">care:</span> {product.care ?? 'on request'}
              </p>
            </div>
          </div>
        </section>
      </section>

      {related.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-text/10">
          <h2 className="text-[0.8rem] tracking-[0.22em] lowercase text-text/70">
            others also liked
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {related.map((p) => {
              const img = p.featuredImage?.url ?? '/placeholder.jpg';
              const alt = p.featuredImage?.altText ?? p.title;

              const amount = Number(p.priceRange.minVariantPrice.amount);
              const label = Number.isFinite(amount)
                ? `${amount.toLocaleString('no-NO')} EUR`
                : 'on request';

              return (
                <Link
                  key={p.id}
                  href={`/shop/${collectionHandle}/${p.handle}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-background/60">
                    <Image
                      src={img}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                  </div>

                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="min-w-0 truncate text-[0.7rem] tracking-[0.16em] text-text/75 lowercase">
                      {p.title}
                    </p>
                    <p className="shrink-0 text-[0.7rem] tracking-[0.16em] text-text/60">{label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

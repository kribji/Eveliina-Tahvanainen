'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, itemCount, total, removeFromCart, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmpty = items.length === 0;

  // ✅ block checkout if any line is missing variant id
  const missingMerchandiseId = items.some((i: any) => !i?.merchandiseId);

  const formattedTotal = useMemo(() => {
    return total ? `${total.toLocaleString('no-NO')} EUR` : '—';
  }, [total]);

  if (submitted) {
    return (
      <main className="bg-[#FFFFFF] text-text">
        <div className="mx-auto max-w-5xl px-4 py-16 space-y-6">
          <h1 className="text-[0.95rem] tracking-[0.22em] lowercase">redirecting</h1>
          <p className="text-sm opacity-75">Taking you to secure Shopify checkout…</p>
          <Link
            href="/shop"
            className="inline-block text-xs tracking-[0.18em] underline underline-offset-4"
          >
            back to shop →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FFFFFF] text-text">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-10">
        {/* Back */}
        <div>
          <Link
            href="/shop"
            className="text-xs tracking-[0.18em] opacity-70 hover:opacity-100 underline-offset-4 hover:underline"
          >
            ← shop
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
          {/* LEFT: info + button */}
          <section className="space-y-6">
            <h1 className="text-[0.95rem] tracking-[0.22em] lowercase">checkout</h1>

            {error && <p className="text-sm tracking-[0.06em] text-red-600">{error}</p>}

            {missingMerchandiseId && !isEmpty && (
              <p className="text-sm opacity-70">
                One or more items can’t be checked out yet (missing variant id). Please remove and
                add the item again from its product page.
              </p>
            )}

            <p className="text-sm opacity-70">
              Shipping and payment are completed securely in Shopify checkout.
            </p>

            <button
              type="button"
              disabled={isEmpty || submitting || missingMerchandiseId}
              onClick={async () => {
                setError(null);

                if (isEmpty) return;
                if (missingMerchandiseId) {
                  setError('Checkout not ready: missing variant id(s) in cart items.');
                  return;
                }

                setSubmitting(true);

                try {
                  const res = await fetch('/api/cart/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      lines: items.map((item: any) => ({
                        merchandiseId: item.merchandiseId,
                        quantity: item.quantity,
                      })),
                    }),
                  });

                  const json = await res.json();

                  if (!res.ok || !json.ok || !json.checkoutUrl) {
                    throw new Error(json.error ?? 'Failed to start checkout');
                  }

                  setSubmitted(true);
                  window.location.href = json.checkoutUrl;
                } catch (err: any) {
                  console.error(err);
                  setError(err?.message ?? 'Checkout failed');
                } finally {
                  setSubmitting(false);
                }
              }}
              className={`
                mt-2 w-full py-3
                text-center text-[0.7rem] tracking-[0.25em]
                transition-colors
                ${
                  isEmpty || submitting || missingMerchandiseId
                    ? 'bg-text/30 text-background/70 cursor-not-allowed'
                    : 'bg-text text-background hover:bg-text/85'
                }
              `}
            >
              {submitting ? 'redirecting…' : 'continue to checkout'}
            </button>

            {!isEmpty && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[0.7rem] tracking-[0.18em] opacity-60 hover:opacity-100"
              >
                clear bag
              </button>
            )}
          </section>

          {/* RIGHT: summary */}
          <aside className="space-y-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[0.85rem] tracking-[0.18em] lowercase">
                summary {itemCount > 0 ? `(${itemCount})` : ''}
              </h2>

              {!isEmpty && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[0.7rem] tracking-[0.18em] opacity-60 hover:opacity-100"
                >
                  clear
                </button>
              )}
            </div>

            <div className="h-px bg-[#000000]/10" />

            {isEmpty ? (
              <div className="space-y-3 text-sm opacity-70">
                <p>Your bag is empty.</p>
                <Link
                  href="/shop"
                  className="inline-block text-xs tracking-[0.18em] underline underline-offset-4"
                >
                  browse shop →
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item: any) => (
                  <li key={item.merchandiseId} className="flex gap-4">
                    <div className="relative h-20 w-16 overflow-hidden bg-white/40">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-[0.75rem] tracking-[0.14em] lowercase">
                          {item.title}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.merchandiseId)}
                          className="text-[0.7rem] tracking-[0.14em] opacity-60 hover:opacity-100"
                        >
                          remove
                        </button>
                      </div>

                      <div className="mt-1 flex items-baseline justify-between text-[0.7rem] tracking-[0.14em] opacity-80">
                        <span>qty {item.quantity}</span>
                        <span>
                          {typeof item.price === 'number'
                            ? `${item.price.toLocaleString('no-NO')} EUR`
                            : 'on request'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="h-px bg-[#4A3C30]/10" />

            <div className="flex items-baseline justify-between text-[0.8rem] tracking-[0.18em]">
              <span>total</span>
              <span>{formattedTotal}</span>
            </div>

            <p className="text-xs tracking-[0.14em] opacity-60">
              Final total (shipping/tax) is calculated in Shopify checkout.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

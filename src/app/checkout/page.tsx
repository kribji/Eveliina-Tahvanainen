'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, itemCount, total, removeFromCart, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const isEmpty = items.length === 0;

  const formattedTotal = useMemo(() => {
    return total ? `${total.toLocaleString('no-NO')} EUR` : '—';
  }, [total]);

  if (submitted) {
    return (
      <main className="bg-[#FFFFFF] text-text">
        <div className="mx-auto max-w-5xl px-4 py-16 space-y-6">
          <h1 className="text-[0.95rem] tracking-[0.22em] lowercase">thank you</h1>
          <p className="text-sm opacity-75">
            This is a mock checkout for now. Payment will be added once the shop is connected to
            real products.
          </p>
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
          {/* LEFT: form */}
          <section className="space-y-6">
            <h1 className="text-[0.95rem] tracking-[0.22em] lowercase">checkout</h1>

            <p className="text-sm opacity-70">
              This checkout is a placeholder. Orders are not processed yet.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // “Mock submit” for tomorrow’s delivery
                setSubmitted(true);
                // optionally clear cart:
                // clearCart();
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder="first name"
                  className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
                />
                <input
                  required
                  placeholder="last name"
                  className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
                />
              </div>

              <input
                required
                type="email"
                placeholder="email"
                className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
              />

              <input
                required
                placeholder="address"
                className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder="city"
                  className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
                />
                <input
                  required
                  placeholder="postal code"
                  className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
                />
              </div>

              <input
                required
                placeholder="country"
                className="w-full bg-white/40 px-4 py-3 text-sm tracking-[0.08em] outline-none placeholder:opacity-50"
              />

              <button
                type="submit"
                disabled={isEmpty}
                className={`
    mt-4 w-full py-3
    text-center text-[0.7rem] tracking-[0.25em]
    transition-colors
    ${
      isEmpty
        ? 'bg-text/30 text-background/70 cursor-not-allowed'
        : 'bg-text text-background hover:bg-text/85'
    }
  `}
              >
                place order
              </button>
            </form>
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
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 overflow-hidden bg-white/40">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-[0.75rem] tracking-[0.14em] lowercase">
                          {item.title}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
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
              Shipping + payment will be added once products/prices are finalized.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

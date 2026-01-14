'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { isOpen, closeCart, items, itemCount, total, removeFromCart, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[92vw] max-w-md bg-[#FFFFFF] text-text shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="text-[0.85rem] tracking-[0.18em]">
              bag {itemCount > 0 ? `(${itemCount})` : ''}
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="text-[0.8rem] tracking-[0.18em] opacity-70 hover:opacity-100"
            >
              close
            </button>
          </div>

          <div className="h-px bg-[#4A3C30]/10" />

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {items.length === 0 ? (
              <div className="space-y-3 text-sm opacity-70">
                <p>Your bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-block text-xs tracking-[0.18em] underline underline-offset-4"
                >
                  browse shop →
                </Link>
              </div>
            ) : (
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-20 overflow-hidden bg-white/40">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[0.8rem] tracking-[0.14em] lowercase">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[0.7rem] tracking-[0.14em] opacity-60">
                            qty {item.quantity}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[0.7rem] tracking-[0.14em] opacity-60 hover:opacity-100"
                        >
                          remove
                        </button>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between text-[0.75rem] tracking-[0.14em] opacity-80">
                        <span>price</span>
                        <span>
                          {item.price ? `${item.price.toLocaleString('no-NO')} EUR` : 'on request'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <>
              <div className="h-px bg-[#4A3C30]/10" />
              <div className="px-5 py-5 space-y-4">
                <div className="flex items-baseline justify-between text-[0.8rem] tracking-[0.18em]">
                  <span>total</span>
                  <span>{total ? `${total.toLocaleString('no-NO')} EUR` : '—'}</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-[#5f4a3b] py-3 text-center text-[0.7rem] tracking-[0.25em] text-[#FFFFFF] transition-colors hover:bg-[#4f3e32]"
                >
                  checkout
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-2 text-[0.7rem] tracking-[0.18em] opacity-60 hover:opacity-100"
                >
                  clear bag
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, removeFromCart } = useCart();

  return (
    <div
      className={`fixed inset-0 z-40 transform transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={closeCart} aria-hidden="true" />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#f6eee6] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={closeCart}
            className="text-xs tracking-[0.2em] uppercase text-text"
          >
            x
          </button>
          <span className="text-xs tracking-[0.2em] uppercase text-text/70">bag</span>
        </div>

        {/* Items */}
        <div className="px-6 py-4 space-y-4 text-xs tracking-[0.2em]">
          {items.length === 0 ? (
            <p className="text-text/60">your bag is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border-b border-text/10 pb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden bg-background/60">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-text">
                      {item.quantity} {item.title}
                    </p>
                    <p className="text-[0.7rem] text-text/60">{item.price} EUR</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-[0.7rem] text-text">
                    {(item.price * item.quantity).toFixed(0)} EUR
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-[0.6rem] uppercase tracking-[0.2em] text-text/50"
                  >
                    remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / total + button */}
        {items.length > 0 && (
          <div className="mt-auto px-6 pb-8 pt-4">
            <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.2em] text-text/80">
              <span>total</span>
              <span>{total.toFixed(0)} EUR</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#5f4a3b] py-3 text-center text-[0.7rem] uppercase tracking-[0.25em] text-[#f6eee6] transition-colors hover:bg-[#4f3e32]"
            >
              proceed to checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}

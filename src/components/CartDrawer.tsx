'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { isOpen, closeCart, items, itemCount } = useCart();

  // ✅ hydration guard
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ✅ during SSR (and first client paint), render a stable shell
  // so server HTML === client HTML.
  if (!mounted) {
    return (
      <>
        {/* Backdrop shell */}
        <div className="fixed inset-0 z-40 bg-black/20 opacity-0 pointer-events-none" />
        {/* Drawer shell */}
        <aside className="fixed right-0 top-0 z-50 h-full w-[86vw] max-w-sm translate-x-full bg-white shadow-xl" />
      </>
    );
  }

  // ✅ real UI after hydration
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
        className={`fixed right-0 top-0 z-50 h-full w-[86vw] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-[0.85rem] tracking-[0.18em] text-text/80">bag ({itemCount})</p>

            <button
              type="button"
              onClick={closeCart}
              className="text-[0.8rem] tracking-[0.18em] opacity-70 hover:opacity-100"
            >
              x
            </button>
          </div>

          <div className="h-px bg-[#4A3C30]/10" />

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {items.length === 0 ? (
              <p className="text-sm text-text/70">Your bag is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.merchandiseId} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-text">{item.title}</p>
                      <p className="text-xs text-text/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-text/70">{item.price ? `${item.price} EUR` : ''}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-[#4A3C30]/10 p-5">
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-md bg-[#4A3C30] px-4 py-3 text-center text-sm tracking-[0.14em] text-white"
            >
              checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

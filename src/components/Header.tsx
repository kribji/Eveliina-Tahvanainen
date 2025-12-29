'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { itemCount, toggleCart } = useCart();

  const [showSticky, setShowSticky] = useState(() => !isHome);

  useEffect(() => {
    if (!isHome) return; // non-home stays sticky

    const THRESHOLD = 260;
    const onScroll = () => setShowSticky(window.scrollY > THRESHOLD);

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <header className={`${showSticky ? 'fixed' : 'hidden'} inset-x-0 top-0 z-50`}>
      <div className="bg-white/70 backdrop-blur-[2px]">
        {/* tighter, more “hard left” */}
        <div className="px-3 py-1.5">
          {/* DESKTOP */}
          <div className="hidden h-14 items-center md:flex">
            {/* LEFT GROUP: logo + nav */}
            <div className="flex items-center gap-10">
              <Link href="/" aria-label="Home" className="flex-shrink-0">
                <div className="relative h-11 w-24">
                  <Image
                    src="/logo-mark.png"
                    alt="Eveliina mark"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <nav className="flex items-center gap-10 text-[1.05rem] tracking-[0.14em] text-text/80">
                <Link href="/work" className="hover:text-text">
                  work
                </Link>
                <Link href="/shop" className="hover:text-text">
                  shop
                </Link>
                <Link href="/about" className="hover:text-text">
                  about
                </Link>
              </nav>
            </div>

            {/* BAG right */}
            <button
              type="button"
              onClick={toggleCart}
              className="ml-auto text-[1.05rem] tracking-[0.14em] text-text/80 hover:text-text"
            >
              <span className="relative inline-block">
                bag
                {itemCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-text px-1 text-[0.65rem] leading-none text-background">
                    {itemCount}
                  </span>
                )}
              </span>
            </button>
          </div>

          {/* MOBILE */}
          <div className="flex h-12 items-center justify-between md:hidden">
            <Link href="/" aria-label="Home">
              <div className="relative h-9 w-20">
                <Image
                  src="/logo-mark.png"
                  alt="Eveliina mark"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={toggleCart}
              className="text-[0.95rem] tracking-[0.12em] text-text/80"
            >
              <span className="relative inline-block">
                bag
                {itemCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-text px-1 text-[0.65rem] leading-none text-background">
                    {itemCount}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

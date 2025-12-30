'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const THRESHOLD = 260;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { itemCount, toggleCart } = useCart();
  const isActive = (href: string) => pathname === href;

  // Only track whether we've scrolled past threshold on HOME
  const [pastThreshold, setPastThreshold] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setPastThreshold(window.scrollY > THRESHOLD);

    // initial sync (but NOT synchronous setState inside effect body)
    const raf = window.requestAnimationFrame(onScroll);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome]);

  // ✅ derived (no setState needed)
  const showSticky = !isHome || pastThreshold;

  return (
    <header className={`${showSticky ? 'fixed' : 'hidden'} inset-x-0 top-0 z-50`}>
      {/* Make this match your background color */}
      <div className="bg-[#FFF9F3]">
        <div className="px-3 py-1.5">
          {/* DESKTOP */}
          <div className="hidden h-14 items-center md:flex">
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

              <nav className="flex items-center gap-10 text-[1.05rem] tracking-[0.14em]">
                <Link
                  href="/shop"
                  className={`hover:text-[#4A3C30] ${
                    isActive('/shop') ? 'text-[#4A3C30]' : 'text-[#4A3C30]/80'
                  }`}
                >
                  shop
                </Link>

                <Link
                  href="/exhibition"
                  className={`hover:text-[#4A3C30] ${
                    isActive('/exhibition') ? 'text-[#4A3C30]' : 'text-[#4A3C30]/80'
                  }`}
                >
                  exhibition
                </Link>

                <Link
                  href="/about"
                  className={`hover:text-[#4A3C30] ${
                    isActive('/about') ? 'text-[#4A3C30]' : 'text-[#4A3C30]/80'
                  }`}
                >
                  about
                </Link>
              </nav>
            </div>

            <button
              type="button"
              onClick={toggleCart}
              className="ml-auto text-[1.05rem] tracking-[0.14em] text-[#4A3C30]/80 hover:text-[#4A3C30]"
            >
              <span className="relative inline-block">
                bag
                {itemCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A3C30] px-1 text-[0.65rem] leading-none text-[#FFF9F3]">
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
              className="text-[0.95rem] tracking-[0.12em] text-[#4A3C30]/80"
            >
              <span className="relative inline-block">
                bag
                {itemCount > 0 && (
                  <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A3C30] px-1 text-[0.65rem] leading-none text-[#FFF9F3]">
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

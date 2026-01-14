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
  const [pastThreshold, setPastThreshold] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setPastThreshold(window.scrollY > THRESHOLD);
    const raf = window.requestAnimationFrame(onScroll);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome]);

  const showSticky = !isHome || pastThreshold;

  return (
    <>
      <header className={`${showSticky ? 'fixed' : 'hidden'} inset-x-0 top-0 z-50`}>
        <div className="bg-white/80 backdrop-blur-[2px]">
          <div className="px-3 py-1.5">
            {/* DESKTOP */}
            <div className="hidden h-14 items-center md:flex">
              <div className="flex items-center gap-10">
                <Link href="/" aria-label="Home" className="flex-shrink-0">
                  <div className="relative h-11 w-24">
                    <Image
                      src="/black-logo.png"
                      alt="Eveliina mark"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>

                <nav className="flex items-center gap-10 text-[1.05rem] tracking-[0.14em]">
                  {[
                    { href: '/shop', label: 'shop' },
                    { href: '/exhibition', label: 'gallery' },
                    { href: '/about', label: 'about' },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`hover:text-text ${
                        isActive(l.href) ? 'text-text' : 'text-text/80'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                onClick={toggleCart}
                className="ml-auto text-[1.05rem] tracking-[0.14em] text-text/80 hover:text-text"
              >
                <span className="relative inline-block">
                  bag
                  {itemCount > 0 && (
                    <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A3C30] px-1 text-[0.65rem] leading-none text-[#FFFFFF]">
                      {itemCount}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* MOBILE: burger / centered logo / bag */}
            <div className="relative flex h-12 items-center md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="text-[0.8rem] tracking-[0.22em] lowercase text-text/80 hover:text-text"
              >
                menu
              </button>

              <Link
                href="/"
                aria-label="Home"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
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
                className="ml-auto text-[0.8rem] tracking-[0.12em] text-text/80"
              >
                <span className="relative inline-block">
                  bag
                  {itemCount > 0 && (
                    <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4A3C30] px-1 text-[0.65rem] leading-none text-[#FFFFFF]">
                      {itemCount}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[86vw] max-w-sm bg-[#FFFFFF] text-text shadow-xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-[0.8 rem] tracking-[0.18em] opacity-70 hover:opacity-100"
            >
              x
            </button>
          </div>

          <div className="h-px bg-[#4A3C30]/10" />

          <nav className="flex flex-col px-5 py-6 gap-5 text-[0.95rem] tracking-[0.14em]">
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className={isActive('/shop') ? 'text-text' : 'text-text/80'}
            >
              shop
            </Link>

            <Link
              href="/exhibition"
              onClick={() => setMenuOpen(false)}
              className={isActive('/exhibition') ? 'text-text' : 'text-text/80'}
            >
              gallery
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={isActive('/about') ? 'text-text' : 'text-text/80'}
            >
              about
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/work', label: 'work' },
  { href: '/about', label: 'about' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(!isHome); // visible by default on non-home

  const lastScrollY = useRef(0);
  const introPhaseDone = useRef(false);

  useEffect(() => {
    // Non-home: just keep header visible, no scroll behavior
    if (!isHome) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    // Home: fancy scroll behavior
    const handleScroll = () => {
      const current = window.scrollY;
      const previous = lastScrollY.current;

      // Near top: hide header so hero gets full attention
      if (current < 80) {
        setVisible(false);
        lastScrollY.current = current;
        return;
      }

      // Intro phase: first time scrolling down, keep header visible for a while
      if (!introPhaseDone.current) {
        setVisible(true);

        if (current > 320) {
          introPhaseDone.current = true;
        }

        lastScrollY.current = current;
        return;
      }

      // After intro phase: show on scroll up, hide on scroll down
      if (current < previous) {
        setVisible(true);
      } else if (current > previous + 4) {
        setVisible(false);
      }

      lastScrollY.current = current;
    };

    // Initialize
    lastScrollY.current = window.scrollY;
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const baseClasses = 'bg-background/80 backdrop-blur';
  const positionClasses = isHome
    ? `fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`
    : 'w-full';

  return (
    <header className={`${baseClasses} ${positionClasses}`}>
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:py-5">
        {/* Left: Logo */}
        <Link href="/" className="tracking-header text-base text-text md:text-lg">
          ev.
        </Link>

        {/* Centered desktop nav */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-12 text-sm tracking-[0.25em] text-text/80 md:flex md:text-base">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-text ${pathname === item.href ? 'text-text' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: hamburger on right, centered vertically, animating into X */}
        <button
          className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={`absolute h-[2px] w-6 bg-text transition-transform duration-300 ${
              open ? 'rotate-45' : '-translate-y-[4px]'
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-text transition-transform duration-300 ${
              open ? '-rotate-45' : 'translate-y-[4px]'
            }`}
          />
        </button>
      </div>

      {/* Mobile menu – centered under header */}
      {open && (
        <nav className="bg-background/95 px-4 pb-4 pt-3 text-sm tracking-[0.15em] md:hidden">
          <ul className="flex flex-col items-center gap-3 text-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-text/80 transition hover:text-text"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

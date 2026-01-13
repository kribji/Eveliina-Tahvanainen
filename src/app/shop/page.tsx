'use client';

import Image from 'next/image';
import Link from 'next/link';
import { shopCategories } from '@/lib/shop-categories';

export default function ShopPage() {
  return (
    <main className="bg-[#FFF9F3] text-[#4A3C30]">
      <section className="pt-20 md:pt-28 flex flex-col gap-12 md:gap-16 lg:gap-20">
        {shopCategories.map((category) => (
          <Link key={category.key} href={category.href} className="group block">
            <figure
              className="
    relative mx-auto overflow-hidden
    w-[92vw] sm:w-[86vw] md:w-[72vw] lg:w-[62vw] xl:w-[56vw]
    h-[78vh] min-h-[560px] max-h-[900px]
  "
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="
                  object-cover
                  transition-transform duration-[1200ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  md:group-hover:scale-[1.03]
                "
                sizes="(min-width: 1280px) 62vw,
                       (min-width: 1024px) 68vw,
                       (min-width: 768px) 78vw,
                       (min-width: 640px) 90vw,
                       96vw"
              />

              {/* sheer overlay — desktop hover only */}
              <div
                className="
                  absolute inset-0
                  bg-white/0
                  transition-all duration-700
                  md:group-hover:bg-white/30
                "
                aria-hidden="true"
              />

              {/* label */}
              <div
                className="
    pointer-events-none absolute inset-0
    flex items-end md:items-center justify-center
    pb-6 md:pb-0
    opacity-100 md:opacity-0
    transition-all duration-700
    md:group-hover:opacity-100
  "
              >
                <span
                  className="
      bg-white/90
      px-4 py-1.5
      text-[0.7rem] md:text-3xl
      lowercase
      tracking-[0.18em]
      text-text
      md:bg-transparent
      md:px-0 md:py-0
    "
                >
                  {category.label}
                </span>
              </div>

              {/* arrow — desktop only */}
              <div
                className="
                  pointer-events-none absolute bottom-6 right-6
                  text-xl opacity-0 transition-opacity duration-500
                  md:group-hover:opacity-35
                "
              >
                →
              </div>
            </figure>
          </Link>
        ))}
      </section>
    </main>
  );
}

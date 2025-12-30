'use client';

import Image from 'next/image';
import Link from 'next/link';
import { shopCategories } from '@/lib/shop-categories';

export default function ShopPage() {
  return (
    <main className="bg-[#FFF9F3] text-[#4A3C30]">
      <section className="flex flex-col">
        {shopCategories.map((category) => (
          <Link key={category.key} href={category.href} className="group block">
            <figure
              className="
                relative mx-auto overflow-hidden
                w-[96vw] sm:w-[90vw] md:w-[78vw] lg:w-[68vw] xl:w-[62vw]
                h-[78vh] min-h-[560px] max-h-[900px]
              "
            >
              <Image
                src={category.image}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 68vw, (min-width: 768px) 78vw, (min-width: 640px) 90vw, 96vw"
              />

              {/* subtle sheer */}
              <div
                className="
                  absolute inset-0
                  bg-white/0
                  transition-all duration-700
                  group-hover:bg-white/30
                "
                aria-hidden="true"
              />

              {/* label */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  flex items-center justify-center
                  opacity-0 transition-all duration-700
                  group-hover:opacity-100
                "
              >
                <span className="text-3xl md:text-4xl lowercase tracking-[0.14em]">
                  {category.label}
                </span>
              </div>

              {/* subtle arrow */}
              <div
                className="
                  pointer-events-none absolute bottom-6 right-6
                  text-xl opacity-0 transition-opacity duration-500
                  group-hover:opacity-35
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

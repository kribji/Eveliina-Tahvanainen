// src/app/work/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getWorkCategories } from '@/lib/work';

export default async function WorkPage() {
  const categories = await getWorkCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-10">
      {/* Category tiles */}
      <section className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/work/${category.slug}`} className="group block">
            <figure className="relative aspect-[3/4] overflow-hidden bg-background/60">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover overlay + category title */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/0 opacity-0 transition-all duration-700 ease-out group-hover:bg-white/50 group-hover:opacity-100">
                <span className="tracking-header text-2xl lowercase text-text md:text-3xl">
                  {category.title}
                </span>
              </div>
            </figure>
          </Link>
        ))}
      </section>
    </div>
  );
}

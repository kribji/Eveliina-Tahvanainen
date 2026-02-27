// src/app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-10">
      <div className="mb-2">
        <Link
          href="/"
          className="text-xs tracking-body text-text/60 underline-offset-4 hover:underline"
        >
          ←
        </Link>
      </div>

      <section className="space-y-6 text-sm leading-relaxed md:text-base">
        <p>
          Eveliina is a Finnish glass and ceramic designer whose work is inspired by organic forms,
          everyday beauty and human experience. She transforms traditional materials into
          contemporary, thoughtful pieces that brings out curiosity.
        </p>
        <p>
          She holds a degree as a Visual Artisan and a Bachelor of Culture and Arts in Smart and
          Sustainable Design. Her practice is guided by circular design principles and she is often
          using recycled and upcycled materials. The fluidity and balance of nature shape both the
          form and technique of her work.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/eveliina.jpeg"
            alt="Eveliina holding a sculptural piece"
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 50vw, 92vw"
            quality={80}
          />
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/volcanic-home.jpeg"
            alt="Sculpture in a rocky landscape"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 92vw"
            quality={80}
          />
        </div>
      </section>

      <section className="space-y-6 text-sm leading-relaxed md:text-base">
        <p>
          Eveliina’s work has been exhibited in Finland, Portugal, and at Milan Design Week. In
          2023, her foam glass piece <em>Volcanic Home</em> was nominated as The most interesting phenomenon at Habitare,
          reflecting her ongoing exploration of sustainability and material expression.
        </p>
      </section>
    </div>
  );
}

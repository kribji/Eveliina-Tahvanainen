// src/app/about/page.tsx
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-16 space-y-10">
        {/* Top text block */}
        <section className="space-y-6 text-sm leading-relaxed md:text-base">
          <p>
            Eveliina Tahvanainen is a Finnish designer and artist working with glass and ceramics.
            Her work grows from a curiosity about natural forms — how time, weather, and touch shape
            the world around us.
          </p>
          <p>
            She explores the intersection between structure and spontaneity, drawing inspiration
            from organic forms, natural erosion, and the quiet transformation of materials.
          </p>
        </section>

        {/* Image pair */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/eveliina.jpeg"
              alt="Eveliina holding a sculptural piece"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/main-piece.jpeg"
              alt="Sculpture in a rocky landscape"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Bottom text block */}
        <section className="space-y-6 text-sm leading-relaxed md:text-base">
          <p>
            In 2023, her piece <em>Volcanic Home</em> was recognized as The Most Interesting
            Phenomenon at the Habitare Fair in Helsinki. Dedicated to sustainability and circular
            design, Eveliina continues to evolve her practice through a close relationship with
            nature, guided by curiosity, patience, and a deep respect for materials.
          </p>
          <p>
            With a degree in Culture and Arts, specializing in glass and ceramics, Eveliina
            challenges the boundaries of traditional craftsmanship through experimentation —
            particularly with foam glass, a recycled material that merges fragility and resilience.
            By uncovering the potential of glass in its most elemental state, she develops textures
            and surfaces that feel both raw and otherworldly.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
}

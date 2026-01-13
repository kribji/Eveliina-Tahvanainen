import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[65vh] w-screen overflow-hidden sm:h-[70vh] md:h-screen">
      {/* HERO IMAGES */}
      <div className="relative flex h-full w-full">
        {/* Left image */}
        <div className="relative h-full w-1/2">
          <Image
            src="/hero-left.jpeg"
            alt="Sculpture at sea"
            fill
            priority
            className="object-cover"
          />
          {/* sheer layer */}
          <div className="absolute inset-0 bg-white/25" aria-hidden="true" />
        </div>

        {/* Right image */}
        <div className="relative h-full w-1/2">
          <Image
            src="/hero-right.jpeg"
            alt="Sculpture on beach"
            fill
            priority
            className="object-cover"
          />
          {/* sheer layer */}
          <div className="absolute inset-0 bg-white/25" aria-hidden="true" />
        </div>
      </div>

      {/* LOGO OVERLAY (centered over images) */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <div className="relative h-40 w-screen sm:h-48 md:h-64 lg:h-72 xl:h-80">
          <Image src="/logo1.png" alt="Eveliina Studio" fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
}

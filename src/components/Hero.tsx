import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[65vh] w-screen overflow-hidden sm:h-[70vh] md:h-screen">
      <div className="relative flex h-full w-full">
        {/* Left image */}
        <div className="relative h-full w-1/2">
          <Image src="/hero-left.jpeg" alt="Sculpture sea" fill priority className="object-cover" />
        </div>

        {/* Right image */}
        <div className="relative h-full w-1/2">
          <Image
            src="/hero-right.jpeg"
            alt="Sculpture beach"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Centered text across both images */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <h1 className="tracking-header text-text text-3xl lowercase sm:text-4xl md:text-7xl">
            eveliina
          </h1>
        </div>
      </div>
    </section>
  );
}

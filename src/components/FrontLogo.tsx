import Image from 'next/image';
import Link from 'next/link';

export default function FrontLogo() {
  return (
    <section className="bg-[#FFFFFF] py-32 md:py-44">
      <div className="flex justify-center">
        <Link href="/" aria-label="Home">
          <div
            className="
              relative
              h-28 w-[70vw]
              max-w-3xl
              opacity-60
              transition-opacity duration-300
              hover:opacity-100
            "
          >
            <Image
              src="/logo-mark.png"
              alt="Eveliina Tahvanainen"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

'use client';

type CTAProps = {
  onClick?: () => void;
};

export default function CTA({ onClick }: CTAProps) {
  return (
    <section className="bg-background pt-8 pb-16">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onClick}
          className="text-base md:text-lg font-normal tracking-[0.22em] text-[#4A3C30]/80 transition-all duration-300 hover:text-[#4A3C30] hover:tracking-[0.26em]"
        >
          get in touch
        </button>
      </div>
    </section>
  );
}

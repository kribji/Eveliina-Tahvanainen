type CTAProps = {
  onClick: () => void;
};

export default function CTA({ onClick }: CTAProps) {
  return (
    <section className="bg-background pt-10 pb-20">
      <div className="flex justify-center">
        <button
          onClick={onClick}
          className="
            text-base md:text-lg
            font-medium
            tracking-[0.26em]
            text-[#4A3C30]/80
            transition-all duration-300 ease-out
            hover:text-[#4A3C30]
            hover:tracking-[0.3em]
          "
        >
          get in touch
        </button>
      </div>
    </section>
  );
}

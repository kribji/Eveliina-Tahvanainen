export default function CTA() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-sm border border-[#4A3C30]/10 bg-[#FFF9F3] p-6 md:p-8">
          <p className="text-xs tracking-[0.18em] text-[#4A3C30]/70">
            interested in a piece or collaboration?
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="mailto:hello@yourdomain.com"
              className="inline-flex w-fit items-center justify-center rounded-sm bg-[#4A3C30] px-4 py-2 text-xs tracking-[0.18em] text-[#FFF9F3]"
            >
              get in touch
            </a>

            <span className="text-xs tracking-[0.12em] text-[#4A3C30]/60">or DM on Instagram</span>
          </div>
        </div>
      </div>
    </section>
  );
}

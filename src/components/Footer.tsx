import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-transparent text-text">
      <div className="mx-auto w-full px-6 py-10 text-[12px] tracking-body">
        {/* ICONS — centered */}
        <div className="flex justify-center gap-8 text-2xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition hover:opacity-70"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition hover:opacity-70"
          >
            <FaFacebook />
          </a>
        </div>

        {/* SPACING */}
        <div className="mt-8" />

        {/* TEXT ROW */}
        <div className="flex w-full items-start justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-2 text-left">
            <a href="mailto:hello@yourdomain.com" className="transition hover:opacity-70">
              hello@yourdomain.com
            </a>

            <span>
              Eveliina Tahvanainen <span className="opacity-50">/</span>{' '}
              <a
                href="https://www.kristinebjorgan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-70"
              >
                Webdesign: Kristine Bjørgan
              </a>
            </span>
          </div>

          {/* RIGHT */}
          <div className="text-right">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}

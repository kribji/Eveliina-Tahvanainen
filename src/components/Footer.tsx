import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-transparent text-text">
      {/* Centered content */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-8 text-xs tracking-body">
        {/* Social icons */}
        <div className="flex gap-6 text-2xl text-text/80">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition hover:text-text"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition hover:text-text"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Names */}
        <p className="text-center text-[11px] text-text/80">
          Eveliina Tahvanainen <span className="text-text/50">/</span>{' '}
          <span className="text-text">Webdesign: Kristine Bjørgan</span>
        </p>
      </div>

      {/* Full-width split row */}
      <div className="flex w-full justify-between px-6 pb-8 text-[11px] text-text/60 tracking-body">
        {/* Left */}
        <div className="flex flex-col gap-1">
          <a href="mailto:hello@yourdomain.com" className="transition hover:text-text">
            hello@yourdomain.com
          </a>
          <span>VAT: FI12345678</span>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-1">
          <span>+358 40 123 4567</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

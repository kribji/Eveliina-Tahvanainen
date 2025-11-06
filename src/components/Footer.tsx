import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-transparent text-text">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8 text-xs tracking-body">
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

        {/* Copyright */}
        <p className="text-center text-[11px] text-text/80">
          © {new Date().getFullYear()} Eveliina Tahvanainen / Webdesign:{' '}
          <span className="text-text">Kristine Bjørgan</span>
        </p>
      </div>
    </footer>
  );
}

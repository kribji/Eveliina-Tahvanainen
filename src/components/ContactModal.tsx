type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-background px-6 py-8 text-text">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xs tracking-[0.2em] text-text/60 hover:text-text"
        >
          close
        </button>

        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="name"
            className="w-full border-b border-text/20 bg-transparent py-2 text-sm focus:outline-none"
            disabled
          />

          <input
            type="email"
            placeholder="email"
            className="w-full border-b border-text/20 bg-transparent py-2 text-sm focus:outline-none"
            disabled
          />

          <textarea
            placeholder="message"
            rows={4}
            className="w-full border-b border-text/20 bg-transparent py-2 text-sm focus:outline-none"
            disabled
          />
        </form>
      </div>
    </div>
  );
}

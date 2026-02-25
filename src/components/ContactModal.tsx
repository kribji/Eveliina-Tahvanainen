'use client';

import { useEffect, useState } from 'react';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvnykwd';

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      setErrorMsg(null);
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [open]);

  // optional: ESC closes modal
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg =
          data?.errors?.[0]?.message || data?.message || 'Something went wrong. Please try again.';
        setStatus('error');
        setErrorMsg(msg);
        return;
      }

      setStatus('success');
      // keep fields or clear; currently clears:
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';

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

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-text/20 bg-transparent py-2 text-sm focus:outline-none"
            required
            disabled={isSubmitting || isSuccess}
          />

          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-text/20 bg-transparent py-2 text-sm focus:outline-none"
            required
            disabled={isSubmitting || isSuccess}
          />

          <textarea
            name="message"
            placeholder="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-b border-text/20 bg-transparent py-2 text-sm focus:outline-none"
            required
            disabled={isSubmitting || isSuccess}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="text-xs tracking-[0.2em] text-text/80 hover:text-text disabled:opacity-40"
            >
              {isSubmitting ? 'sending...' : isSuccess ? 'sent' : 'send'}
            </button>
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-500/90">{errorMsg ?? 'Something went wrong.'}</p>
          )}

          {status === 'success' && (
            <p className="text-xs text-text/60">Thanks — message received.</p>
          )}
        </form>
      </div>
    </div>
  );
}

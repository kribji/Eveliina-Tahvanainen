// src/lib/front-gallery.ts

export type FrontWork = {
  src: string;
  alt: string;
  href?: string;
  width: string;
  align?: 'left' | 'right';

  title?: string;
  year?: string;
  caption?: string;
  description?: string;
};

export const frontWorks = Array.from({ length: 8 }, (_, i) => ({
  src: `/${String(i + 1).padStart(2, '0')}.jpeg`,
  alt: `Work ${i + 1}`,
  title: `Work ${i + 1}`,
  caption: 'Ceramic work',
  width: 'w-[min(520px,92vw)]',
  align: i % 2 === 0 ? 'right' : 'left',
}));

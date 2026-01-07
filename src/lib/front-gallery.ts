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

export const frontWorks: FrontWork[] = [
  {
    src: '/01.jpeg',
    alt: 'Volcanic Home',
    title: 'Volcanic Home',
    caption: 'Foam glass, 2023',
    width: 'w-[min(520px,92vw)]',
    align: 'right',
    href: '/exhibition',
  },
];

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
    src: '/something.jpg',
    alt: '…',
    title: 'Volcanic Home', // optional
    caption: 'Foam glass, 2023', // optional
    width: 'w-[...]',
    align: 'right',
    href: '/exhibition',
  },
];

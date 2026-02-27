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

export const frontWorks = [
  {
    src: '/01.jpeg',
    alt: 'Embodied Earth',
    title: 'Embodied Earth',
    caption: 'Ceramics',
    width: 'w-[min(560px,92vw)]', // hero
    align: 'left',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/02.jpeg',
    alt: 'Embodied Earth',
    title: 'Embodied Earth',
    caption: 'Ceramics',
    width: 'w-[min(420px,92vw)]', // smaller
    align: 'right',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/03.jpeg',
    alt: 'Embodied Earth',
    title: 'Embodied Earth',
    caption: 'Ceramics',
    width: 'w-[min(500px,92vw)]', // large
    align: 'left',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/04.jpeg',
    alt: 'Two Souls',
    title: 'Two Souls',
    caption: 'Ceramics',
    width: 'w-[min(380px,92vw)]',
    align: 'right',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/05.jpeg',
    alt: 'Two Souls',
    title: 'Two Souls',
    caption: 'Ceramics',
    width: 'w-[min(560px,92vw)]',
    align: 'left',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/06.jpeg',
    alt: 'Void',
    title: 'Void',
    caption: 'Ceramics',
    width: 'w-[min(440px,92vw)]',
    align: 'right',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/07.jpeg',
    alt: 'Two Souls',
    title: 'Two Souls',
    caption: 'Ceramics',
    width: 'w-[min(400px,92vw)]',
    align: 'left',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/two-souls.jpeg',
    alt: 'Two Souls',
    title: 'Two Souls',
    caption: 'Ceramics',
    width: 'w-[min(500px,92vw)]',
    align: 'right',
    href: '/shop',
    year: '2025',
  },
  {
    src: '/volcanic-home.jpeg',
    alt: 'Volcanic Home',
    title: 'Volcanic Home',
    caption: 'Foam glass',
    width: 'w-[min(500px,92vw)]',
    align: 'left',
    href: '/shop',
    year: '2022',
  },
  {
    src: '/volcanic-home2.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Foam glass',
    width: 'w-[min(500px,92vw)]',
    align: 'right',
    href: '/shop',
    year: '2022',
  },
  {
    src: '/foam-pieces.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Foam glass',
    width: 'w-[min(500px,92vw)]',
    align: 'left',
    href: '/shop',
    year: '2022',
  },
  {
    src: '/foam-pieces2.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Foam glass',
    width: 'w-[min(500px,92vw)]',
    align: 'right',
    href: '/shop',
    year: '2022',
  },
  {
    src: '/foam-pieces3.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Foam glass',
    width: 'w-[min(500px,92vw)]',
    align: 'left',
    href: '/shop',
    year: '2022',
  },
  {
    src: '/foam-pieces-on-chain.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Foam glass',
    width: 'w-[min(500px,92vw)]',
    align: 'right',
    href: '/shop',
    year: '2022',
  },
] satisfies FrontWork[];

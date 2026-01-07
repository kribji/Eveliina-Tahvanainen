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
    alt: 'Volcanic Home',
    title: 'Volcanic Home',
    caption: 'Foam glass, 2023',
    width: 'w-[min(520px,92vw)]',
    align: 'right',
    href: '/exhibition/volcanic-home',
  },
  {
    src: '/02.jpeg',
    alt: 'Ceramic Study I',
    title: 'Ceramic Study I',
    caption: 'Stoneware, 2023',
    width: 'w-[min(440px,92vw)]',
    align: 'left',
  },
  {
    src: '/03.jpeg',
    alt: 'Ceramic Study II',
    title: 'Ceramic Study II',
    caption: 'Stoneware, 2023',
    width: 'w-[min(480px,92vw)]',
    align: 'right',
  },
  {
    src: '/04.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Clay, 2024',
    width: 'w-[min(400px,92vw)]',
    align: 'left',
  },
  {
    src: '/05.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Clay, 2024',
    width: 'w-[min(400px,92vw)]',
    align: 'left',
  },
  {
    src: '/06.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Clay, 2024',
    width: 'w-[min(400px,92vw)]',
    align: 'left',
  },
  {
    src: '/07.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Clay, 2024',
    width: 'w-[min(400px,92vw)]',
    align: 'left',
  },
  {
    src: '/08.jpeg',
    alt: 'Untitled',
    title: 'Untitled',
    caption: 'Clay, 2024',
    width: 'w-[min(400px,92vw)]',
    align: 'left',
  },
];

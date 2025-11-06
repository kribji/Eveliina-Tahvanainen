export type FrontWorkAlign = 'left' | 'right';

export type FrontWork = {
  src: string;
  alt: string;
  align: FrontWorkAlign;
  width: string; // tailwind width class
};

export const frontWorks: FrontWork[] = [
  { src: '/01.jpeg', alt: 'Sculpture on beach, vertical', align: 'left', width: 'w-2/3' },
  { src: '/02.jpeg', alt: 'Smaller sculpture on sand', align: 'right', width: 'w-1/2' },
  { src: '/03.jpeg', alt: 'Tall sculpture in soft light', align: 'left', width: 'w-3/4' },
  { src: '/04.jpeg', alt: 'Sculpture on rocks', align: 'right', width: 'w-2/3' },
  { src: '/05.jpeg', alt: 'Soft organic form on dark sand', align: 'left', width: 'w-1/2' },
  { src: '/06.jpeg', alt: 'Sculpture landscape at dusk', align: 'right', width: 'w-3/4' },
  { src: '/07.jpeg', alt: 'Tall stacked sculpture outdoors', align: 'left', width: 'w-2/3' },
  { src: '/08.jpeg', alt: 'Sculpture outdoors', align: 'right', width: 'w-2/3' },
];

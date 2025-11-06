// src/lib/work.ts

export type WorkCategorySlug = 'ceramics' | 'sculptures' | 'jewelry';

export type WorkCategory = {
  slug: WorkCategorySlug;
  title: string;
  image: string;
  blurb: string;
};

export const workCategories: WorkCategory[] = [
  {
    slug: 'ceramics',
    title: 'ceramics',
    image: '/ceramics.jpeg',
    blurb: 'Vessels and objects in ceramic and glass.',
  },
  {
    slug: 'sculptures',
    title: 'sculptures',
    image: '/sculptures.jpeg',
    blurb: 'One-of-a-kind sculptural pieces.',
  },
  {
    slug: 'jewelry',
    title: 'jewelry',
    image: '/jewelry.jpeg',
    blurb: 'Wearable objects and small forms.',
  },
];

// In the future these could fetch from Lemon Squeezy instead:
export async function getWorkCategories(): Promise<WorkCategory[]> {
  return workCategories;
}

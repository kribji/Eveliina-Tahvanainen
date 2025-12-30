export type ShopCategory = {
  key: string;
  label: string;
  href: string;
  image: string;
};

export const shopCategories: ShopCategory[] = [
  { key: 'bowls', label: 'bowls', href: '/work/ceramics', image: '/bowls.jpeg' },
  { key: 'cups', label: 'cups', href: '/work/ceramics', image: '/ceramics.jpeg' },
  { key: 'jewelry', label: 'jewelry', href: '/work/jewelry', image: '/jewelry.jpeg' },
  { key: 'sculptures', label: 'sculptures', href: '/work/sculptures', image: '/sculptures.jpeg' },
  { key: 'objects', label: 'objects', href: '/work', image: '/hero-right.jpeg' },
];

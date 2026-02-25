export type ShopCategory = {
  key: string;
  label: string;
  href: string;
  image: string;
};

export const shopCategories: ShopCategory[] = [
  { key: 'bowls', label: 'bowls', href: '/shop/ceramics', image: '/bowls.jpeg' },
  { key: 'cups', label: 'cups', href: '/shop/ceramics', image: '/ceramics.jpeg' },
  { key: 'jewelry', label: 'jewelry', href: '/shop/jewelry', image: '/jewelry.jpeg' },
  { key: 'sculptures', label: 'sculptures', href: '/shop/sculptures', image: '/sculptures.jpeg' },
  { key: 'objects', label: 'objects', href: '/shop/objects', image: '/hero-right.jpeg' },
];

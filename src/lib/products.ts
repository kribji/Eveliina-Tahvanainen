export type ProductCategory = 'ceramics' | 'sculptures' | 'jewelry';

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  image: string;
  hoverImage: string;
  description: string;
  price?: number;
};

export const products: Product[] = [
  {
    id: 'ceramic-cups-01',
    slug: 'ceramic-cups-01',
    title: 'Stacked stoneware cups',
    category: 'ceramics',
    image: '/ceramics.jpeg',
    hoverImage: '/ceramics3.jpeg',
    description:
      'Hand-thrown stoneware cups with a soft matte glaze. Each piece is unique, shaped by the natural pull of the material.',
  },
  {
    id: 'ceramic-bowls-01',
    slug: 'ceramic-bowls-01',
    title: 'Soft glazed bowls',
    category: 'ceramics',
    image: '/bowls.jpeg',
    hoverImage: '/bowls2.jpeg',
    description:
      'Minimalist bowls with a speckled soft glaze. Designed for everyday rituals and shared meals.',
  },
  {
    id: 'sculpture-foamglass-01',
    slug: 'sculpture-foamglass-01',
    title: 'Foam glass formation I',
    category: 'sculptures',
    image: '/sculptures.jpeg',
    hoverImage: '/sculptures2.jpeg',
    description:
      'A sculptural exploration of foam glass, capturing the fragile balance between density and air.',
  },
  {
    id: 'jewelry-heart-01',
    slug: 'jewelry-heart-01',
    title: 'Hanging stone heart',
    category: 'jewelry',
    image: '/jewelry.jpeg',
    hoverImage: '/jewelry2.jpeg',
    description:
      'A wearable stone heart, carved and formed by hand. A personal piece meant to be carried close.',
  },
];

// Get all products by category (used for category pages)
export function getProductsByCategory(categorySlug: string): Product[] {
  if (!categorySlug) return [];
  return products.filter((p) => p.category === categorySlug);
}

// Get a single product by its slug (used for product detail page)
export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

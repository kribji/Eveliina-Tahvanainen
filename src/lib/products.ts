export type ProductCategory = 'ceramics' | 'sculptures' | 'jewelry';

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  image: string;
  hoverImage: string;
};

export const products: Product[] = [
  {
    id: 'ceramic-cups-01',
    slug: 'ceramic-cups-01',
    title: 'Stacked stoneware cups',
    category: 'ceramics',
    image: '/ceramics/ceramic-cups-01-main.jpeg',
    hoverImage: '/ceramics/ceramic-cups-01-alt.jpeg',
  },
  {
    id: 'ceramic-bowls-01',
    slug: 'ceramic-bowls-01',
    title: 'Soft glazed bowls',
    category: 'ceramics',
    image: '/ceramics/ceramic-bowls-01-main.jpeg',
    hoverImage: '/ceramics/ceramic-bowls-01-alt.jpeg',
  },
  {
    id: 'sculpture-foamglass-01',
    slug: 'sculpture-foamglass-01',
    title: 'Foam glass formation I',
    category: 'sculptures',
    image: '/sculptures/sculpture-01-main.jpeg',
    hoverImage: '/sculptures/sculpture-01-alt.jpeg',
  },
  {
    id: 'jewelry-heart-01',
    slug: 'jewelry-heart-01',
    title: 'Hanging stone heart',
    category: 'jewelry',
    image: '/jewelry/jewelry-01-main.jpeg',
    hoverImage: '/jewelry/jewelry-01-alt.jpeg',
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

// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';
import { PRODUCTS_QUERY } from '@/lib/shopify.queries';

type ShopifyProductsResponse = {
  products: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description: string;
        images: { edges: Array<{ node: { url: string; altText: string | null } }> };
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
      };
    }>;
  };
};

export async function GET() {
  try {
    const data = await shopifyFetch<ShopifyProductsResponse, { first: number }>({
      query: PRODUCTS_QUERY,
      variables: { first: 12 },
    });

    const products = data.products.edges.map(({ node }) => ({
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      image: node.images.edges[0]?.node?.url ?? null,
      alt: node.images.edges[0]?.node?.altText ?? node.title,
      price: node.priceRange.minVariantPrice,
    }));

    return NextResponse.json({ ok: true, products });
  } catch (err: any) {
    console.error('PRODUCTS API ERROR:', err);
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}

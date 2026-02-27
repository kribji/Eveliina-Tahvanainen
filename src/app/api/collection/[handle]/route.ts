export const dynamic = 'force-dynamic';
// src/app/api/collection/[handle]/route.ts
import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

const COLLECTION_BY_HANDLE = /* GraphQL */ `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: 20) {
        nodes {
          id
          handle
          title
          description
          featuredImage {
            url
            altText
          }
          images(first: 2) {
            nodes {
              url
              altText
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function GET(_: Request, ctx: { params: Promise<{ handle: string }> }) {
  try {
    const { handle } = await ctx.params;

    if (!handle) {
      return NextResponse.json({ ok: false, error: 'Missing handle param' }, { status: 400 });
    }

    const data = await shopifyFetch<{
      collection: null | {
        id: string;
        handle: string;
        title: string;
        products: {
          nodes: {
            id: string;
            handle: string;
            title: string;
            description: string;
            featuredImage: { url: string; altText: string | null } | null;
            images: { nodes: { url: string; altText: string | null }[] } | null;
            priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
          }[];
        };
      };
    }>({
      query: COLLECTION_BY_HANDLE,
      variables: { handle },
    });

    if (!data.collection) {
      return NextResponse.json(
        { ok: false, error: `No collection for handle: ${handle}` },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, collection: data.collection });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}

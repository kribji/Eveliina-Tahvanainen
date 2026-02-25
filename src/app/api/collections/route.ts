// src/app/api/collections/route.ts
import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

const COLLECTIONS_QUERY = /* GraphQL */ `
  query Collections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        image {
          url
          altText
        }
      }
    }
  }
`;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const first = Number(searchParams.get('first') ?? 20);

    const data = await shopifyFetch<{
      collections: {
        nodes: {
          id: string;
          handle: string;
          title: string;
          image: null | { url: string; altText: string | null };
        }[];
      };
    }>({ query: COLLECTIONS_QUERY, variables: { first } });

    return NextResponse.json({ ok: true, collections: data.collections.nodes });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}

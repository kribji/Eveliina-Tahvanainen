// src/app/api/product/[handle]/route.ts
import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

const PRODUCT_BY_HANDLE = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      variants(first: 1) {
        nodes {
          id
          price {
            amount
            currencyCode
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }

      # Metafields
      dimensions: metafield(namespace: "custom", key: "dimensions") {
        value
      }
      materials: metafield(namespace: "custom", key: "materials") {
        value
      }
      care: metafield(namespace: "custom", key: "care") {
        value
      }
    }
  }
`;

export async function GET(req: Request, ctx: any) {
  try {
    const p = await Promise.resolve(ctx?.params);
    const handle = p?.handle ?? new URL(req.url).pathname.split('/').filter(Boolean).pop();

    if (!handle) {
      return NextResponse.json({ ok: false, error: 'Missing handle param' }, { status: 400 });
    }

    const data = await shopifyFetch<{
      product: null | {
        id: string;
        handle: string;
        title: string;
        description: string;
        featuredImage: { url: string; altText: string | null } | null;
        images: { nodes: { url: string; altText: string | null }[] };
        variants: {
          nodes: {
            id: string;
            price: { amount: string; currencyCode: string };
          }[];
        };
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };

        // Metafields
        dimensions: { value: string } | null;
        materials: { value: string } | null;
        care: { value: string } | null;
      };
    }>({
      query: PRODUCT_BY_HANDLE,
      variables: { handle },
    });

    if (!data.product) {
      return NextResponse.json(
        { ok: false, error: `No product for handle: ${handle}` },
        { status: 404 },
      );
    }

    const pdt = data.product;
    const firstVariant = pdt.variants?.nodes?.[0] ?? null;

    return NextResponse.json({
      ok: true,
      product: {
        id: pdt.id,
        handle: pdt.handle,
        title: pdt.title,
        description: pdt.description,
        image: pdt.featuredImage?.url ?? pdt.images.nodes[0]?.url ?? null,
        alt: pdt.featuredImage?.altText ?? pdt.title,
        images: pdt.images.nodes,

        // keep your existing price for display (minVariantPrice)
        price: pdt.priceRange.minVariantPrice,

        // variant id used as Shopify CartLineInput.merchandiseId
        variantId: firstVariant?.id ?? null,

        // Metafields exposed to frontend
        dimensions: pdt.dimensions?.value ?? null,
        materials: pdt.materials?.value ?? null,
        care: pdt.care?.value ?? null,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}

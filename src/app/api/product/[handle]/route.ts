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

      options {
        name
        values
      }

      variants(first: 50) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
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

function findColorOptionName(options: { name: string; values: string[] }[]) {
  const candidates = ['color', 'colour', 'väri', 'vari'];
  const hit = options.find((o) => candidates.includes(o.name.trim().toLowerCase()));
  return hit?.name ?? null; // return the ACTUAL stored name (e.g. "Color")
}

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
        options: { name: string; values: string[] }[];
        variants: {
          nodes: {
            id: string;
            availableForSale: boolean;
            selectedOptions: { name: string; value: string }[];
            price: { amount: string; currencyCode: string };
          }[];
        };
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
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

    const colorOptionName = findColorOptionName(pdt.options ?? []);

    const firstAvailableVariant =
      pdt.variants?.nodes?.find((v) => v.availableForSale) ?? pdt.variants?.nodes?.[0] ?? null;

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

        // keep existing display price
        price: pdt.priceRange.minVariantPrice,

        // NEW
        options: pdt.options ?? [],
        colorOptionName, // e.g. "Color" (or "Väri")
        variants: pdt.variants?.nodes ?? [],
        variantId: firstAvailableVariant?.id ?? null, // fallback

        dimensions: pdt.dimensions?.value ?? null,
        materials: pdt.materials?.value ?? null,
        care: pdt.care?.value ?? null,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}

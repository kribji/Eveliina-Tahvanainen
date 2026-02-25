import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

export async function GET() {
  try {
    const data = await shopifyFetch<any>({
      query: `
        query {
          shop {
            name
          }
        }
      `,
    });

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    console.error('SHOPIFY TEST ERROR:', err);
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? String(err),
        // sometimes useful:
        name: err?.name,
        cause: err?.cause ? String(err.cause) : undefined,
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const lines = Array.isArray(body?.lines) ? body.lines : [];
    if (lines.length === 0) {
      return NextResponse.json({ ok: false, error: 'No cart lines provided' }, { status: 400 });
    }

    // Basic validation (don’t trust client price; Shopify will price at checkout)
    for (const l of lines) {
      if (!l?.merchandiseId || typeof l?.merchandiseId !== 'string') {
        return NextResponse.json(
          { ok: false, error: 'Each line must include merchandiseId' },
          { status: 400 },
        );
      }
      const qty = Number(l?.quantity);
      if (!Number.isFinite(qty) || qty < 1) {
        return NextResponse.json(
          { ok: false, error: 'Each line must include a valid quantity' },
          { status: 400 },
        );
      }
    }

    const data = await shopifyFetch<CartCreateResponse, { lines: any[] }>({
      query: CART_CREATE,
      variables: { lines },
    });

    const errors = data.cartCreate.userErrors ?? [];
    if (errors.length) {
      return NextResponse.json(
        { ok: false, error: errors.map((e) => e.message).join(' • ') },
        { status: 400 },
      );
    }

    const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
    if (!checkoutUrl) {
      return NextResponse.json(
        { ok: false, error: 'No checkoutUrl returned from Shopify' },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, checkoutUrl });
  } catch (err: any) {
    console.error('CART CHECKOUT API ERROR:', err);
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}
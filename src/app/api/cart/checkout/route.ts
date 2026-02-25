// src/app/api/cart/checkout/route.ts

import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify';

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type CartCreateVariables = {
  lines: CartLineInput[];
};

type CartCreateResponse = {
  cartCreate: {
    cart: {
      checkoutUrl: string;
    } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lines = (body?.lines ?? []) as CartLineInput[];

    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ ok: false, error: 'Missing cart lines' }, { status: 400 });
    }

    const variables: CartCreateVariables = { lines };

    const data = await shopifyFetch<CartCreateResponse>({
      query: CART_CREATE,
      variables,
    });

    const errors = data?.cartCreate?.userErrors ?? [];
    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: errors.map((e) => e.message).join(', ') },
        { status: 400 },
      );
    }

    const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
    if (!checkoutUrl) {
      return NextResponse.json({ ok: false, error: 'No checkoutUrl returned' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, checkoutUrl });
  } catch (err: any) {
    console.error('CHECKOUT API ERROR:', err);
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}

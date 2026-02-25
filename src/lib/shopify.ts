// src/lib/shopify.ts

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, any>;
};

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const SHOPIFY_DOMAIN = requireEnv('SHOPIFY_DOMAIN');
const STOREFRONT_TOKEN = requireEnv('SHOPIFY_STOREFRONT_TOKEN');
const API_VERSION = process.env.SHOPIFY_API_VERSION ?? '2025-10';

const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

export async function shopifyFetch<T>({ query, variables }: ShopifyFetchParams): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Next caching defaults can surprise you; keep it simple for now:
    cache: 'no-store',
  });

  const json = await res.json();

  if (!res.ok || json?.errors) {
    throw new Error(
      JSON.stringify(
        {
          status: res.status,
          statusText: res.statusText,
          errors: json?.errors,
        },
        null,
        2,
      ),
    );
  }

  return json.data as T;
}

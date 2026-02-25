// src/lib/shopify.ts

type ShopifyFetchParams<TVariables> = {
  query: string;
  variables?: TVariables;
};

export async function shopifyFetch<TResponse, TVariables = Record<string, unknown>>(
  params: ShopifyFetchParams<TVariables>,
): Promise<TResponse> {
  const { query, variables } = params;

  const endpoint = process.env.SHOPIFY_STOREFRONT_API_ENDPOINT;
  const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  if (!endpoint || !token) {
    throw new Error('Missing SHOPIFY_STOREFRONT_API_ENDPOINT or SHOPIFY_STOREFRONT_API_TOKEN');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText} ${text}`);
  }

  const json = (await res.json()) as {
    data?: TResponse;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  if (!json.data) {
    throw new Error('Shopify response missing data');
  }

  return json.data;
}

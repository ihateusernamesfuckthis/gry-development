const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;

export async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const res = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // så du altid får friske data under udvikling
  });

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.statusText}`);
  }

  return res.json();
}

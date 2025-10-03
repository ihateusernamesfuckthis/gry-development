import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";

// Query to get all products
const PRODUCTS_QUERY = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
        }
      }
    }
  }
`;

// GET /api/products - Returns a list of all products
export async function GET() {
  try {
    const data = await shopifyFetch(PRODUCTS_QUERY);
    const products = (data as any)?.data?.products?.edges || [];

    return NextResponse.json({ products });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

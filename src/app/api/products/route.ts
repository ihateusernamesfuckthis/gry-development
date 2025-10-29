import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { ProductsQueryResponse } from "@/types/shopify";
import { getErrorMessage } from "@/lib/utils/errors";

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
    const data = await shopifyFetch<ProductsQueryResponse>(PRODUCTS_QUERY);
    const products = data.data?.products?.edges || [];

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

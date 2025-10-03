import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { ProductQueryResponse } from "@/types/shopify";

// Query to get a single product by handle
const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
    }
  }
`;

// GET /api/products/[handle] - Returns a single product by its handle
export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;

    const data = await shopifyFetch<ProductQueryResponse>(PRODUCT_BY_HANDLE_QUERY, { handle });
    const product = data.data?.product;

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

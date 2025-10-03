import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";

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

    const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
    const product = (data as any)?.data?.product;

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

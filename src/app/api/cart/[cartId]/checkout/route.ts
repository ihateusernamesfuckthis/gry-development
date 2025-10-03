import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { CartQueryResponse } from "@/types/shopify";

// Query to get checkout URL
const GET_CHECKOUT_URL_QUERY = `
  query GetCheckoutUrl($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
    }
  }
`;

// GET /api/cart/[cartId]/checkout - Get checkout URL and redirect
export async function GET(
  request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;

    const data = await shopifyFetch<CartQueryResponse>(GET_CHECKOUT_URL_QUERY, { cartId });
    const cart = data.data?.cart;

    if (!cart || !cart.checkoutUrl) {
      return NextResponse.json(
        { error: "Checkout URL not found" },
        { status: 404 }
      );
    }

    // Return the checkout URL (frontend can redirect user to this)
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";

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

    const data = await shopifyFetch(GET_CHECKOUT_URL_QUERY, { cartId });
    const cart = (data as any)?.data?.cart;

    if (!cart || !cart.checkoutUrl) {
      return NextResponse.json(
        { error: "Checkout URL not found" },
        { status: 404 }
      );
    }

    // Return the checkout URL (frontend can redirect user to this)
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

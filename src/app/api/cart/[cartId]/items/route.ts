import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { CartLinesAddResponse, CartLinesUpdateResponse } from "@/types/shopify";

// Mutation to add items to a cart
const ADD_TO_CART_QUERY = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// Mutation to update cart item quantities
const UPDATE_CART_LINES_QUERY = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// POST /api/cart/[cartId]/items - Add product to cart
// Body: { merchandiseId: "gid://shopify/ProductVariant/123", quantity: 1 }
export async function POST(
  request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;
    const body = await request.json();
    const { merchandiseId, quantity = 1 } = body;

    if (!merchandiseId) {
      return NextResponse.json(
        { error: "merchandiseId is required" },
        { status: 400 }
      );
    }

    const data = await shopifyFetch<CartLinesAddResponse>(ADD_TO_CART_QUERY, {
      cartId,
      lines: [{ merchandiseId, quantity }],
    });

    const cart = data.data?.cartLinesAdd?.cart;

    if (!cart) {
      return NextResponse.json(
        { error: "Failed to add item to cart" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cart });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// PATCH /api/cart/[cartId]/items - Update cart item quantity
// Body: { lineId: "gid://shopify/CartLine/123", quantity: 2 }
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;
    const body = await request.json();
    const { lineId, quantity } = body;

    if (!lineId || quantity === undefined) {
      return NextResponse.json(
        { error: "lineId and quantity are required" },
        { status: 400 }
      );
    }

    const data = await shopifyFetch<CartLinesUpdateResponse>(UPDATE_CART_LINES_QUERY, {
      cartId,
      lines: [{ id: lineId, quantity }],
    });

    const cart = data.data?.cartLinesUpdate?.cart;

    if (!cart) {
      return NextResponse.json(
        { error: "Failed to update cart" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cart });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

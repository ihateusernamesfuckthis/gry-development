import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { CartQueryResponse } from "@/types/shopify";
import { getErrorMessage } from "@/lib/utils/errors";

// Query to get cart details
const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
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
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

// GET /api/cart/[cartId] - Get cart details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  try {
    const { cartId } = await params;

    const data = await shopifyFetch<CartQueryResponse>(GET_CART_QUERY, { cartId });
    const cart = data.data?.cart;

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

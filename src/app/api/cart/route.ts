import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify/storefront";

// Query to create a new cart
const CREATE_CART_QUERY = `
  mutation CartCreate {
    cartCreate {
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

// POST /api/cart - Creates a new empty cart
export async function POST() {
  try {
    const data = await shopifyFetch(CREATE_CART_QUERY);
    const cart = (data as any)?.data?.cartCreate?.cart;

    if (!cart) {
      return NextResponse.json(
        { error: "Failed to create cart" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cart });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

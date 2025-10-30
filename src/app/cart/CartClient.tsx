"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartId } from "@/hooks/useCartId";
import { formatPrice } from "@/lib/utils/formatPrice";
import { logError } from "@/lib/utils/errors";

interface Money {
  amount: string;
  currencyCode: string;
}

interface ProductImage {
  url: string;
  altText?: string;
}

interface ProductVariant {
  id: string;
  title: string;
  price?: Money;
  product?: {
    id: string;
    title: string;
    handle: string;
    images?: {
      edges: Array<{
        node: ProductImage;
      }>;
    };
  };
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant;
  cost?: {
    totalAmount: Money;
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    totalAmount: Money;
    subtotalAmount?: Money;
  };
}

export default function CartClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingLineId, setUpdatingLineId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { cartId } = useCartId();

  const fetchCart = async () => {
    if (!cartId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/cart/${encodeURIComponent(cartId)}`);
      if (response.ok) {
        const { cart: cartData } = await response.json();
        setCart(cartData);
      }
    } catch (err) {
      logError("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cartId]);

  const updateQuantity = async (lineId: string, newQuantity: number) => {
    if (!cartId) return;

    setUpdatingLineId(lineId);
    setError(null);

    try {
      const response = await fetch(
        `/api/cart/${encodeURIComponent(cartId)}/items`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lineId,
            quantity: newQuantity,
          }),
        }
      );

      if (response.ok) {
        const { cart: updatedCart } = await response.json();
        setCart(updatedCart);
      } else {
        setError("Failed to update quantity");
      }
    } catch (err) {
      logError("Error updating quantity:", err);
      setError("Failed to update quantity");
    } finally {
      setUpdatingLineId(null);
    }
  };

  const removeItem = async (lineId: string) => {
    await updateQuantity(lineId, 0);
  };

  const proceedToCheckout = async () => {
    if (!cartId) return;

    setError(null);

    try {
      const response = await fetch(
        `/api/cart/${encodeURIComponent(cartId)}/checkout`
      );
      if (response.ok) {
        const { checkoutUrl } = await response.json();
        window.location.href = checkoutUrl;
      } else {
        setError("Failed to get checkout URL");
      }
    } catch (err) {
      logError("Error getting checkout URL:", err);
      setError("Failed to proceed to checkout");
    }
  };

  if (loading) {
    return (
      <div className="self-stretch px-0 py-12">
        <div className="text-black text-2xl font-extrabold font-['Archivo']">
          Loading cart...
        </div>
      </div>
    );
  }

  const cartLines = cart?.lines.edges.map((edge) => edge.node) || [];

  if (cartLines.length === 0) {
    return (
      <div className="self-stretch inline-flex flex-col justify-start items-start gap-3">
        <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5">
          <div className="justify-start text-black text-8xl font-black font-['Archivo'] uppercase leading-[80px]">
            CART
          </div>
        </div>
        <div className="text-black text-2xl font-extrabold font-['Archivo'] pt-12">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5">
        <div className="justify-start text-black text-8xl font-black font-['Archivo'] uppercase leading-[80px]">
          CART
        </div>
      </div>

      <div className="self-stretch pt-12 flex flex-col gap-8">
      {/* Error message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-base font-['Archivo']">{error}</p>
        </div>
      )}

      {/* Column Headers */}
      <div className="grid grid-cols-[400px_1fr_200px_200px] gap-8 mb-8 pb-4 border-b-2 border-black">
        <div className="text-black text-lg font-extrabold font-['Archivo']">
          ITEM
        </div>
        <div></div>
        <div className="text-black text-lg font-extrabold font-['Archivo']">
          QUANTITY
        </div>
        <div className="text-black text-lg font-extrabold font-['Archivo']">
          SUBTOTAL
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex flex-col gap-8">
        {cartLines.map((line) => {
          const product = line.merchandise.product;
          const lineTotal = line.cost?.totalAmount || line.merchandise.price;
          const productImage = product?.images?.edges[0]?.node;

          return (
            <div
              key={line.id}
              className="grid grid-cols-[400px_1fr_200px_200px] gap-8 pb-8 border-b border-gray-200"
            >
              {/* Product Image */}
              <div className="w-full h-[400px] bg-stone-50 relative">
                {productImage ? (
                  <Image
                    src={productImage.url}
                    alt={productImage.altText || product?.title || "Product"}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="flex flex-col gap-2">
                <div className="text-black text-lg font-extrabold font-['Archivo'] uppercase">
                  {product?.title || "Product"}
                </div>
                <div className="text-black text-base font-normal font-['Archivo']">
                  {line.merchandise.title}
                </div>
                <div className="text-black text-sm font-normal font-['Archivo'] mt-2">
                  SIZE
                </div>
                <div className="text-black text-base font-normal font-['Archivo']">
                  {line.merchandise.title}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  min="1"
                  value={line.quantity}
                  onChange={(e) => {
                    const newQty = parseInt(e.target.value);
                    if (newQty > 0) {
                      updateQuantity(line.id, newQty);
                    }
                  }}
                  disabled={updatingLineId === line.id}
                  className="w-24 h-12 border border-black text-center text-black text-lg font-normal font-['Archivo']"
                />
                <button
                  onClick={() => removeItem(line.id)}
                  disabled={updatingLineId === line.id}
                  className="text-gray-400 text-sm font-normal font-['Archivo'] hover:text-black transition-colors text-left"
                >
                  REMOVE ITEM
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-black text-lg font-normal font-['Archivo']">
                {lineTotal && formatPrice(lineTotal.amount, lineTotal.currencyCode)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total and Checkout */}
      <div className="mt-12 flex justify-end items-center gap-12">
        <div className="text-black text-2xl font-extrabold font-['Archivo']">
          TOTAL:{" "}
          {cart && formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
        </div>
        <button
          onClick={proceedToCheckout}
          className="px-8 py-4 bg-black text-white text-lg font-extrabold font-['Archivo'] hover:bg-gray-800 transition-colors"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
      </div>
    </div>
  );
}

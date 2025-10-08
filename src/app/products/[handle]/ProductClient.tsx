"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

interface ProductImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

interface Product {
  id: string;
  title: string;
  description?: string;
  handle: string;
  images?: {
    edges: Array<{
      node: ProductImage;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const variants = product.variants?.edges.map((edge) => edge.node) || [];
  const images = product.images?.edges.map((edge) => edge.node) || [];
  const firstVariant = variants[0];

  useEffect(() => {
    // Load cart ID from localStorage
    const storedCartId = localStorage.getItem("cartId");
    setCartId(storedCartId);
  }, []);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert("Please select a size");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Create cart if it doesn't exist
      let currentCartId = cartId;
      if (!currentCartId) {
        const cartResponse = await fetch("/api/cart", { method: "POST" });
        const { cart } = await cartResponse.json();
        currentCartId = cart.id;
        localStorage.setItem("cartId", cart.id);
        setCartId(cart.id);
      }

      // Type guard to ensure currentCartId is not null
      if (!currentCartId) {
        alert("Failed to create cart");
        return;
      }

      // Add item to cart
      const response = await fetch(
        `/api/cart/${encodeURIComponent(currentCartId)}/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merchandiseId: selectedVariant.id,
            quantity: 1,
          }),
        }
      );

      if (response.ok) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount);
    const formatted = numAmount.toLocaleString("da-DK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (currency === "DKK") {
      return `${formatted} DKK`;
    }
    return `${formatted} ${currency}`;
  };

  return (
    <div className="ProductSection self-stretch inline-flex justify-start items-start gap-8">
      {/* Left side - Product images */}
      <div className="Product w-[640px] inline-flex flex-col justify-start items-start gap-6">
        {/* Header */}
        <div className="RingsHeader self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-center gap-3.5">
          <div className="Ring1 justify-start text-black text-8xl font-black font-['Archivo'] uppercase leading-[80px]">
            {product.title}
          </div>
        </div>

        {/* Images */}
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className="Hoverimagerings self-stretch h-[800px] relative"
          >
            <div className="Rectangle2 w-[640px] h-[800px] left-0 top-0 absolute bg-stone-50" />
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-contain p-8"
            />
          </div>
        ))}
      </div>

      {/* Right side - Product details */}
      <div className="ItemDesc w-96 pt-96 inline-flex flex-col justify-start items-start sticky top-0 self-start">
        <div className="SterlingSilver self-stretch h-4 justify-end text-black text-sm font-extrabold font-['Archivo']">
          925 sterling silver
        </div>
        <div className="MadeByHandMadeToOrder self-stretch h-4 justify-end text-black text-sm font-extrabold font-['Archivo']">
          made by hand, made to order
        </div>
        <div className="000Dkk self-stretch h-12 justify-end text-black text-lg font-extrabold font-['Archivo']">
          {firstVariant && formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)}
        </div>

        {/* Size selector */}
        <div className="Sizes w-72 h-32 pt-9 inline-flex flex-col justify-start items-start">
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.availableForSale}
                className={`Ringsize size-10 inline-flex flex-col justify-center items-center transition-colors ${
                  selectedVariant?.id === variant.id
                    ? "bg-black"
                    : variant.availableForSale
                    ? "bg-black/30 hover:bg-black/50"
                    : "bg-black/10 cursor-not-allowed"
                }`}
              >
                <div className="justify-end text-white text-lg font-extrabold font-['Archivo']">
                  {variant.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart buttons */}
        <div className="Cartbuttons inline-flex justify-center items-center gap-6 mt-6">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || isAddingToCart}
            className={`AddToCart w-32 h-16 justify-center items-center flex text-lg font-extrabold font-['Archivo'] ${
              !selectedVariant || isAddingToCart
                ? "text-black/30 cursor-not-allowed"
                : addedToCart
                ? "text-green-600"
                : "text-black hover:text-black/70"
            }`}
          >
            {addedToCart ? "ADDED ✓" : isAddingToCart ? "ADDING..." : "ADD TO CART"}
          </button>
          <Link
            href="/cart"
            className="GoToCart w-32 h-16 justify-end text-black text-lg font-extrabold font-['Archivo'] flex items-center hover:text-black/70 transition-colors"
          >
            GO TO CART
          </Link>
        </div>
      </div>
    </div>
  );
}

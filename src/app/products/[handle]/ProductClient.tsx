"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant as ShopifyProductVariant } from "@/types/shopify";
import { useCartId } from "@/hooks/useCartId";
import { formatPrice } from "@/lib/utils/formatPrice";
import { logError } from "@/lib/utils/errors";
import { ADDED_TO_CART_DISPLAY_TIME } from "@/constants";

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const { cartId, setCartId } = useCartId();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const variants = product.variants?.edges.map((edge) => edge.node) || [];
  const images = product.images?.edges.map((edge) => edge.node) || [];
  const firstVariant = variants[0];

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      setError("Please select a size");
      return;
    }

    setIsAddingToCart(true);
    setError(null);

    try {
      // Create cart if it doesn't exist
      let currentCartId = cartId;
      if (!currentCartId) {
        const cartResponse = await fetch("/api/cart", { method: "POST" });
        const { cart } = await cartResponse.json();
        currentCartId = cart.id;
        setCartId(cart.id);
      }

      // Type guard to ensure currentCartId is not null
      if (!currentCartId) {
        setError("Failed to create cart");
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
        setTimeout(() => setAddedToCart(false), ADDED_TO_CART_DISPLAY_TIME);
      } else {
        setError("Failed to add to cart");
      }
    } catch (err) {
      logError("Error adding to cart:", err);
      setError("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      {/* MOBILE LAYOUT (< 1024px) */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Top Section: Image Carousel - 60% of available height */}
        <div className="h-[60%] relative flex-shrink-0">
          {/* Horizontal scrolling images */}
          <div
            className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide"
            onScroll={(e) => {
              const scrollLeft = e.currentTarget.scrollLeft;
              const width = e.currentTarget.offsetWidth;
              const index = Math.round(scrollLeft / width);
              setActiveImageIndex(index);
            }}
          >
            {images.map((image) => (
              <div
                key={image.url}
                className="min-w-full h-full snap-center flex items-center justify-center bg-stone-50"
              >
                <Image
                  src={image.url}
                  alt={image.altText || product.title}
                  width={600}
                  height={600}
                  className="object-contain max-h-full p-4"
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeImageIndex ? "bg-black w-6" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Product Details - 40% of available height */}
        <div className="h-[40%] bg-white px-4 py-4 flex flex-col flex-shrink-0">
          {/* Product Title & Price */}
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-xl font-black font-['Archivo'] uppercase leading-tight">
              {product.title}
            </h1>
            <div className="text-base font-extrabold font-['Archivo'] whitespace-nowrap ml-4">
              {firstVariant?.price && formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)}
            </div>
          </div>

          {/* Description */}
          <div className="text-xs font-extrabold font-['Archivo'] mb-3 space-y-0.5">
            <div>925 sterling silver</div>
            <div>made by hand, made to order</div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-xs font-['Archivo']">{error}</p>
            </div>
          )}

          {/* Size selector */}
          <div className="mb-3">
            <div className="text-xs font-extrabold font-['Archivo'] mb-2">SIZE</div>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={!variant.availableForSale}
                  className={`size-9 inline-flex flex-col justify-center items-center transition-colors ${
                    selectedVariant?.id === variant.id
                      ? "bg-black"
                      : variant.availableForSale
                      ? "bg-black/30 hover:bg-black/50"
                      : "bg-black/10 cursor-not-allowed"
                  }`}
                >
                  <div className="text-white text-sm font-extrabold font-['Archivo']">
                    {variant.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart buttons - flex-grow to take remaining space */}
          <div className="flex flex-col gap-2 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || isAddingToCart}
              className={`w-full py-3 text-center text-sm font-extrabold font-['Archivo'] transition-colors ${
                !selectedVariant || isAddingToCart
                  ? "bg-black/20 text-black/30 cursor-not-allowed"
                  : addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {addedToCart ? "ADDED ✓" : isAddingToCart ? "ADDING..." : "ADD TO CART"}
            </button>
            <Link
              href="/cart"
              className="w-full py-3 text-center bg-white border-2 border-black text-black text-sm font-extrabold font-['Archivo'] hover:bg-black hover:text-white transition-colors"
            >
              GO TO CART
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT (≥ 1024px) - Original side-by-side */}
      <div className="hidden lg:inline-flex ProductSection self-stretch justify-start items-start gap-8">
        {/* Left side - Product images */}
        <div className="Product w-[640px] inline-flex flex-col justify-start items-start gap-6">
          {/* Header */}
          <div className="RingsHeader self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-center gap-3.5">
            <div className="Ring1 justify-start text-3xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-tight lg:leading-[80px]">
              {product.title}
            </div>
          </div>

          {/* Images */}
          {images.map((image) => (
            <div
              key={image.url}
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
            {firstVariant?.price && formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)}
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

          {/* Error message */}
          {error && (
            <div className="w-full mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm font-['Archivo']">{error}</p>
            </div>
          )}

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
    </>
  );
}

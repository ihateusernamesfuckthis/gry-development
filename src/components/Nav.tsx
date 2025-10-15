"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [hasCartItems, setHasCartItems] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        setHasCartItems(false);
        return;
      }

      try {
        const response = await fetch(`/api/cart/${encodeURIComponent(cartId)}`);
        if (response.ok) {
          const { cart } = await response.json();
          const itemCount = cart?.lines?.edges?.length || 0;
          setHasCartItems(itemCount > 0);
        } else {
          setHasCartItems(false);
        }
      } catch (error) {
        console.error("Error checking cart:", error);
        setHasCartItems(false);
      }
    };

    // Check cart on mount
    checkCart();

    // Check cart periodically and on window focus
    const interval = setInterval(checkCart, 3000);
    window.addEventListener("focus", checkCart);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkCart);
    };
  }, []);

  return (
    <nav className="w-64 h-screen pt-4 sticky top-0 inline-flex flex-col justify-start items-start">
      {/* Logo */}
      <Link href="/" className="justify-end text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px] hover:opacity-70 transition-opacity">
        GRY
      </Link>

      {/* Nav Wrapper */}
      <div className="pl-1 flex flex-col justify-between flex-1 h-full">
        {/* Menu */}
        <div className="flex flex-col justify-center items-start gap-1 flex-1">
          <Link href="/grillz" className="w-20 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']">
              GRILLZ
            </div>
          </Link>

          <Link href="/rings" className="w-16 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']">
              RINGS
            </div>
          </Link>

          <Link href="/rings" className="w-16 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']">
              APPAREL
            </div>
          </Link>

          <Link href="/archive" className="w-24 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[600] font-['Archivo']">
              ARCHIVE
            </div>
          </Link>

          <Link href="/cart" className="w-14 h-5 relative">
            <div
              className={`left-0 top-0 absolute justify-start text-lg font-[800] font-['Archivo'] transition-all duration-300 ${
                hasCartItems
                  ? "text-yellow-500 scale-110"
                  : "text-black scale-100"
              }`}
            >
              CART
            </div>
          </Link>
        </div>

        {/* Socials */}
        <div className="pb-12 flex flex-col justify-end items-start gap-2">
          <Link href="https://tiktok.com" target="_blank" className="w-14 h-3.5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-sm font-[800] font-['Archivo']">
              TIKTOK
            </div>
          </Link>

          <Link href="https://instagram.com" target="_blank" className="w-24 h-3.5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-sm font-[800] font-['Archivo']">
              INSTAGRAM
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

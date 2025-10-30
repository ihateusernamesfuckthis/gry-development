"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CART_POLL_INTERVAL, SESSION_KEYS, NAV_SCROLL_OFFSET } from "@/constants";
import { logError } from "@/lib/utils/errors";

export default function Nav() {
  const [hasCartItems, setHasCartItems] = useState(false);
  const pathname = usePathname();
  const isArchivePage = pathname === "/archive";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const checkCart = async () => {
      const cartId = localStorage.getItem(SESSION_KEYS.CART_ID);
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
        logError("Error checking cart:", error);
        setHasCartItems(false);
      }
    };

    // Check cart on mount
    checkCart();

    // Check cart periodically and on window focus
    const interval = setInterval(checkCart, CART_POLL_INTERVAL);
    window.addEventListener("focus", checkCart);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkCart);
    };
  }, []);

  // Scroll-spy: use scroll + rAF to pick the section closest to a fixed top offset (stable, non-jittery)
  useEffect(() => {
    const ids = ["grillz", "rings", "apparel", "archive"];
    let ticking = false;

    const updateActive = () => {
      let closestId: string | null = null;
      let minDist = Infinity;

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - NAV_SCROLL_OFFSET);
        if (dist < minDist) {
          minDist = dist;
          closestId = id;
        }
      });

      if (closestId) {
        setActiveSection((prev) => (prev !== closestId ? closestId : prev));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // run once on mount to set initial state
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [usePathname() /* note: pass pathname from hook instead of calling here if linter complains */]);

  const linkClass = (id: string, base = "left-0 top-0 absolute justify-start text-lg font-[800] font-['Archivo']") =>
    `${base} transition-all duration-100 ${
      activeSection === id ? "text-yellow-400" : "text-black scale-100"
    }`;

  return (
    <nav className="w-64 h-screen pt-4 sticky top-0 inline-flex flex-col justify-start items-start">
      {/* Logo */}
      <Link href="/" className="justify-end hover:opacity-70 transition-opacity">
        <div
          className="text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px]"
        >
          GRY
        </div>
      </Link>

      {/* Nav Wrapper */}
      <div className="pl-1 flex flex-col justify-between flex-1 h-full">
        {/* Menu */}
        <div className="flex flex-col justify-center items-start gap-1 flex-1">
          <Link href="/grillz" className="w-20 h-5 relative">
            <div className={linkClass("grillz", "left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']")}>
              GRILLZ
            </div>
          </Link>

          <Link
            href="/#rings"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                document.getElementById("rings")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-16 h-5 relative"
          >
            <div className={linkClass("rings", "left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']")}>
              RINGS
            </div>
          </Link>

          <Link
            href="/#apparel"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                document.getElementById("apparel")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-16 h-5 relative"
          >
            <div className={linkClass("apparel", "left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']")}>
              APPAREL
            </div>
          </Link>

          <Link href="/archive" className="w-24 h-5 relative">
            <div className={linkClass("archive", "left-0 top-0 absolute justify-start text-black text-lg font-[600] font-['Archivo']")}>
              ARCHIVE
            </div>
          </Link>

          {/* Archive Subcategories - Only show on archive page */}
          {isArchivePage && (
            <div className="pl-6 flex flex-col gap-1">
              <Link href="/archive#find-your-smile" className="w-auto h-5 relative">
                <div className="left-0 top-0 absolute justify-start text-black text-base font-[800] font-['Archivo'] whitespace-nowrap">
                  FIND YOUR SMILE
                </div>
              </Link>
              <Link href="/archive#events" className="w-auto h-5 relative">
                <div className="left-0 top-0 absolute justify-start text-black text-base font-[800] font-['Archivo'] whitespace-nowrap">
                  EVENTS
                </div>
              </Link>
              <Link href="/archive#behind-the-scenes" className="w-auto h-5 relative">
                <div className="left-0 top-0 absolute justify-start text-black text-base font-[800] font-['Archivo'] whitespace-nowrap">
                  BEHIND THE SCENES
                </div>
              </Link>
            </div>
          )}

          <Link href="/cart" className="w-14 h-5 relative">
            <div
              className={`left-0 top-0 absolute justify-start text-lg font-[800] font-['Archivo'] transition-all duration-300 ${
                hasCartItems ? "text-yellow-500 scale-110" : "text-black scale-100"
              }`}
            >
              CART
            </div>
          </Link>
        </div>

        {/* Socials */}
        <div className="pb-2 flex flex-col justify-end items-start gap-2">
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

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CART_POLL_INTERVAL, SESSION_KEYS, NAV_SCROLL_OFFSET } from "@/constants";
import { logError } from "@/lib/utils/errors";

export default function Nav() {
  const [hasCartItems, setHasCartItems] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  // Desktop only - mobile nav is hidden
  useEffect(() => {
    // Only run on desktop (1024px+)
    const isDesktop = () => window.innerWidth >= 1024;

    if (!isDesktop()) {
      return; // Don't run on mobile
    }

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

    // On desktop, listen to the scrollable content container
    const contentContainer = document.getElementById('main-content');

    if (contentContainer) {
      contentContainer.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", onScroll);

    // run once on mount to set initial state
    onScroll();

    return () => {
      if (contentContainer) {
        contentContainer.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const linkClass = (id: string, base = "left-0 top-0 absolute justify-start text-lg font-[800] font-['Archivo']") =>
    `${base} transition-all duration-100 ${
      activeSection === id ? "text-contrast" : "text-black scale-100"
    }`;

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation - Sticky Sidebar */}
      <nav className="hidden lg:flex sticky top-0 left-0 w-64 h-screen pt-4 bg-white z-50 flex-col justify-start items-start">
        {/* Logo */}
        <Link href="/" className="justify-end hover:opacity-70 transition-opacity" onClick={handleLinkClick}>
          <div className="text-8xl text-black font-[900] font-['Archivo'] uppercase leading-[80px]">
            GRY
          </div>
        </Link>

        {/* Nav Wrapper */}
        <div className="pl-1 flex flex-col justify-between flex-1 h-full">
          {/* Menu */}
          <div className="flex flex-col justify-center items-start gap-1 flex-1">
            <Link href="/grillz" className="w-20 h-5 relative" onClick={handleLinkClick}>
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
                handleLinkClick();
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
                handleLinkClick();
              }}
              className="w-16 h-5 relative"
            >
              <div className={linkClass("apparel", "left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']")}>
                APPAREL
              </div>
            </Link>

            <Link href="/archive" className="w-24 h-5 relative" onClick={handleLinkClick}>
              <div className={linkClass("archive", "left-0 top-0 absolute justify-start text-black text-lg font-[600] font-['Archivo']")}>
                ARCHIVE
              </div>
            </Link>

            {/* Archive Subcategories - Only show on archive page */}
            {isArchivePage && (
              <div className="pl-6 flex flex-col gap-1">
                <Link href="/archive#find-your-smile" className="w-auto h-5 relative" onClick={handleLinkClick}>
                  <div className="left-0 top-0 absolute justify-start text-black text-base font-[800] font-['Archivo'] whitespace-nowrap">
                    FIND YOUR SMILE
                  </div>
                </Link>
                <Link href="/archive#events" className="w-auto h-5 relative" onClick={handleLinkClick}>
                  <div className="left-0 top-0 absolute justify-start text-black text-base font-[800] font-['Archivo'] whitespace-nowrap">
                    EVENTS
                  </div>
                </Link>
                <Link href="/archive#behind-the-scenes" className="w-auto h-5 relative" onClick={handleLinkClick}>
                  <div className="left-0 top-0 absolute justify-start text-black text-base font-[800] font-['Archivo'] whitespace-nowrap">
                    BEHIND THE SCENES
                  </div>
                </Link>
              </div>
            )}

            <Link href="/cart" className="w-14 h-5 relative" onClick={handleLinkClick}>
              <div
                className={`left-0 top-0 absolute justify-start text-lg font-[800] font-['Archivo'] transition-all duration-300 ${
                  hasCartItems ? "text-contrast scale-100" : "text-black scale-100"
                }`}
              >
                CART
              </div>
            </Link>
          </div>

          {/* Socials */}
          <div className="pb-2 flex flex-col justify-end items-start gap-2">
            <Link href="https://tiktok.com" target="_blank" className="w-14 h-3.5 relative" onClick={handleLinkClick}>
              <div className="left-0 top-0 absolute justify-start text-black text-sm font-[800] font-['Archivo']">
                TIKTOK
              </div>
            </Link>

            <Link href="https://instagram.com" target="_blank" className="w-24 h-3.5 relative" onClick={handleLinkClick}>
              <div className="left-0 top-0 absolute justify-start text-black text-sm font-[800] font-['Archivo']">
                INSTAGRAM
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div className="lg:hidden">
        {/* Top Bar with Logo and Hamburger - Always visible */}
        <div className="fixed top-0 left-0 right-0 h-14 bg-white z-50 flex justify-between items-center px-5">
          <Link href="/" className="justify-end" onClick={handleLinkClick}>
            <div className="text-4xl text-black font-[900] font-['Archivo'] uppercase leading-9">
              GRY
            </div>
          </Link>

          {!isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-7 h-5 flex flex-col justify-center items-center gap-1"
              aria-label="Open menu"
            >
              <div className="w-7 h-1 bg-black" />
              <div className="w-7 h-1 bg-black" />
              <div className="w-7 h-1 bg-black" />
            </button>
          )}

          {isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-7 h-7 relative"
              aria-label="Close menu"
            >
              <div className="absolute w-7 h-1 bg-black top-1/2 left-0 origin-center rotate-45" />
              <div className="absolute w-7 h-1 bg-black top-1/2 left-0 origin-center -rotate-45" />
            </button>
          )}
        </div>

        {/* Full Screen Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="w-28 pl-5 pt-48 flex flex-col justify-start items-start gap-1">
            {/* Main Menu Items */}
            <Link href="/grillz" className="w-20 h-5 relative" onClick={handleLinkClick}>
              <div className="left-0 top-0 justify-start text-black text-lg font-[800] font-['Archivo']">
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
                handleLinkClick();
              }}
              className="w-16 h-5 relative"
            >
              <div className="left-0 top-0 justify-start text-black text-lg font-[800] font-['Archivo']">
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
                handleLinkClick();
              }}
              className="w-16 h-5 relative"
            >
              <div className="left-0 top-0 justify-start text-black text-lg font-[800] font-['Archivo']">
                APPAREL
              </div>
            </Link>

            <Link href="/archive" className="w-24 h-5 relative" onClick={handleLinkClick}>
              <div className="left-0 top-0 justify-start text-black text-lg font-[800] font-['Archivo']">
                ARCHIVE
              </div>
            </Link>

            <Link href="/cart" className="w-14 h-5 relative" onClick={handleLinkClick}>
              <div className={`left-0 top-0 justify-start text-lg font-[800] font-['Archivo'] ${hasCartItems ? "text-contrast" : "text-black"}`}>
                CART
              </div>
            </Link>

            {/* Socials */}
            <div className="pt-12 flex flex-col justify-end items-start gap-2">
              <Link href="https://tiktok.com" target="_blank" className="w-14 h-3.5 relative" onClick={handleLinkClick}>
                <div className="left-0 top-0 justify-start text-black text-sm font-[800] font-['Archivo']">
                  TIKTOK
                </div>
              </Link>

              <Link href="https://instagram.com" target="_blank" className="w-24 h-3.5 relative" onClick={handleLinkClick}>
                <div className="left-0 top-0 justify-start text-black text-sm font-[800] font-['Archivo']">
                  INSTAGRAM
                </div>
              </Link>
            </div>

            {/* Boring Stuff */}
            <div className="pt-96 flex flex-col justify-end items-start gap-2">
              <Link href="/contact" className="w-16 h-3.5 relative" onClick={handleLinkClick}>
                <div className="left-0 top-0 justify-start text-black text-sm font-[800] font-['Archivo']">
                  CONTACT
                </div>
              </Link>

              <Link href="/faq" className="w-7 h-3.5 relative" onClick={handleLinkClick}>
                <div className="left-0 top-0 justify-start text-black text-sm font-[800] font-['Archivo']">
                  FAQ
                </div>
              </Link>

              <Link href="/terms" className="w-44 h-3.5 relative" onClick={handleLinkClick}>
                <div className="left-0 top-0 justify-start text-black text-sm font-[800] font-['Archivo']">
                  TERMS AND CONDITIONS
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

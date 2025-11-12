"use client";

import { useEffect, useState } from "react";
import { SCROLL_THRESHOLD_PERCENTAGE, FADE_OUT_DURATION, SESSION_KEYS } from "@/constants";

export default function LandingHero() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Check if user has seen the hero in this session
    const hasSeenHero = sessionStorage.getItem(SESSION_KEYS.HAS_SEEN_HERO);
    if (hasSeenHero === "true") {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // For desktop, check the content container scroll; for mobile, check window scroll
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      let scrollY = window.scrollY;

      if (isDesktop) {
        // Find the scrollable content container on desktop
        const contentContainer = document.getElementById('main-content');
        if (contentContainer) {
          scrollY = contentContainer.scrollTop;
        }
      }

      const scrollThreshold = window.innerHeight * SCROLL_THRESHOLD_PERCENTAGE;

      if (scrollY > scrollThreshold && !hasScrolled) {
        setHasScrolled(true);
        // Start fade out transition
        setOpacity(0);

        // After transition, remove from DOM and save to session
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem(SESSION_KEYS.HAS_SEEN_HERO, "true");
        }, FADE_OUT_DURATION);
      }
    };

    // Add scroll listener to both window and content container
    const contentContainer = document.getElementById('main-content');

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (contentContainer) {
      contentContainer.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (contentContainer) {
        contentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasScrolled]);

  // Don't render if user has seen it
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-[100vh] z-50 transition-all duration-500 ease-out bg-white"
      style={{
        opacity,
        transform: `translateY(${hasScrolled ? '-5%' : '0'})`,
        pointerEvents: 'none'
      }}
    >
      {/* GRY Logo - centered on hero */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="text-8xl lg:text-[12rem] text-black font-[900] font-['Archivo'] uppercase"
        >
          GRY
        </div>
      </div>

      {/* Scroll Indicator - appears after 2 seconds */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 animate-fade-in-delayed">
        <div className="text-black text-sm font-[600] font-['Archivo'] tracking-wider">
          SCROLL TO ENTER
        </div>
        <div className="w-6 h-10 border-2 border-black rounded-full flex items-start justify-center p-2 animate-bounce-slow">
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}

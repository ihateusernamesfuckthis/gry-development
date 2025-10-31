"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
      const scrollY = window.scrollY;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  // Don't render if user has seen it
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-[100vh] z-50 transition-all duration-500 ease-out"
      style={{
        opacity,
        transform: `translateY(${hasScrolled ? '-5%' : '0'})`,
        pointerEvents: hasScrolled ? 'none' : 'auto'
      }}
    >
      {/* Background image - will be replaced with image loop later */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/heroSection/placeholder.JPG"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* GRY Logo - centered on hero */}
      <div className="absolute inset-0 flex items-end justify-start z-20 pl-4 pb-4 lg:pl-16 lg:pb-16">
        <div
          className="text-5xl lg:text-8xl text-white font-[900] font-['Archivo'] uppercase leading-[60px] lg:leading-[80px]"
        >
          GRY
        </div>
      </div>

      {/* Scroll Indicator - appears after 2 seconds */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 animate-fade-in-delayed">
        <div className="text-white text-sm font-[600] font-['Archivo'] tracking-wider">
          SCROLL TO ENTER
        </div>
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2 animate-bounce-slow">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}

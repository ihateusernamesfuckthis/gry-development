"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LandingHero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const switchPoint = window.innerHeight * 0.1; // Switch at 80% of hero height

      if (scrollY < switchPoint) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-screen h-[100vh] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
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

      {/* GRY Logo - starts at bottom, travels up as user scrolls */}
      <div className="sticky top-0 left-0 h-[100vh] flex items-end z-20">
        <div
          className="pl-15 pb-4 text-white text-8xl font-[900] font-['Archivo'] uppercase leading-[80px] transition-opacity duration-300"
          style={{ opacity }}
        >
          GRY
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function GrillzSection() {
  return (
    <section className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5 sticky top-0 z-10">
        <div className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px]">
          GRILLZ
        </div>
        <div className="w-60 h-6 justify-end text-black text-sm font-[800] font-['Archivo']">
          item description
        </div>
      </div>

      {/* Unified Canvas - All Content in One Container */}
      <div className="self-stretch relative min-h-[700px] pt-12">
        {/* Image 1 - Top Left Area */}
        <div className="absolute left-[8%] top-[5%] w-[22%] hover:scale-110 transition-transform">
          <Image
            src="/grillzsection/GrillTransparent2.png"
            alt="Grillz Design 1"
            width={348}
            height={194}
            className="w-full h-auto"
          />
        </div>

        {/* Image 2 - Top Right Area */}
        <div className="absolute right-[5%] top-0 w-[35%] hover:scale-105 transition-transform">
          <Image
            src="/grillzsection/GrillTransparent4.png"
            alt="Grillz Design 2"
            width={481}
            height={223}
            className="w-full h-auto"
          />
        </div>

        {/* Image 3 - Center Area */}
        <div className="absolute left-[40%] top-[25%] w-[18%] hover:scale-105 transition-transform">
          <Image
            src="/grillzsection/GrillTransparent5.png"
            alt="Grillz Design 3"
            width={223}
            height={103}
            className="w-full h-auto"
          />
        </div>

        {/* CTA Text - Left Center */}
        <div className="absolute left-0 top-[45%] flex flex-col gap-2">
          <h2 className="text-black text-7xl font-[800] font-['Archivo'] uppercase leading-tight whitespace-nowrap">
            FIND YOUR SMILE
          </h2>
          <Link
            href="/grillz"
            className="text-yellow-400 text-lg font-[800] font-['Archivo'] hover:text-yellow-500 transition-colors"
          >
            EXPLORE 
          </Link>
        </div>

        {/* Image 4 - Bottom Left (Rotated) */}
        <div className="absolute left-[8%] bottom-[8%] w-[20%] rotate-[8deg] hover:scale-105 hover:rotate-[10deg] transition-transform">
          <Image
            src="/grillzsection/GrillTransparent3.png"
            alt="Grillz Design 4"
            width={269}
            height={155}
            className="w-full h-auto"
          />
        </div>

        {/* Image 5 - Bottom Right */}
        <div className="absolute right-[8%] bottom-[10%] w-[32%] hover:scale-105 transition-transform">
          <Image
            src="/grillzsection/GrillTransparent6.png"
            alt="Grillz Design 5"
            width={427}
            height={170}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

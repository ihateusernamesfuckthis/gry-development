import Image from "next/image";
import Link from "next/link";

export default function GrillzSection() {
  return (
    <section className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5 sticky top-0 z-10">
        <div id="grillz" className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px]">
          GRILLZ
        </div>
        <div className="w-60 h-6 justify-end text-blue text-sm font-[800] font-['Archivo']">
          item description
        </div>
      </div>

      {/* Unified Canvas - All Content in One Container */}
      <div className="self-stretch relative min-h-[700px] pt-12">
        {/* Image 1 - Top Left Area */}
        <Link href="/grillz" className="absolute left-[8%] top-[5%] w-[22%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/plainopen.avif"
            alt="Grillz Design 1"
            width={348}
            height={194}
            className="w-full h-auto"
          />
        </Link>

        {/* Image 2 - Top Right Area */}
        <Link href="/grillz" className="absolute right-[5%] top-0 w-[35%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/playstation1.avif"
            alt="Grillz Design 2"
            width={481}
            height={223}
            className="w-full h-auto"
          />
        </Link>

        {/* Image 3 - Center Area */}
        <Link href="/grillz" className="absolute left-[35%] top-[25%] w-[18%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/curvy.avif"
            alt="Grillz Design 3"
            width={223}
            height={103}
            className="w-full h-auto"
          />
        </Link>

        {/* CTA Text - Left Center */}
        <div className="absolute left-0 top-[45%] flex flex-col gap-2">
          <Link href="/grillz" className="text-black text-7xl font-[800] font-['Archivo'] uppercase leading-tight whitespace-nowrap transition-colors cursor-pointer">
            FIND YOUR SMILE
          </Link>
          <Link
            href="/grillz"
            className="text-yellow-400 text-lg font-[800] font-['Archivo'] transition-colors"
          >
            EXPLORE
          </Link>
        </div>

        {/* Image 4 - Bottom Left (Rotated) */}
        <Link href="/grillz" className="absolute left-[8%] bottom-[8%] w-[20%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/tribal.avif"
            alt="Grillz Design 4"
            width={269}
            height={155}
            className="w-full h-auto"
          />
        </Link>

        {/* Image 5 - Bottom Right */}
        <Link href="/grillz" className="absolute right-[12%] bottom-[5%] w-[32%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/tree.avif"
            alt="Grillz Design 5"
            width={427}
            height={170}
            className="w-full h-auto"
          />
        </Link>
      </div>
    </section>
  );
}

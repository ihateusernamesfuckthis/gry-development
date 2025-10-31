import Image from "next/image";
import Link from "next/link";

export default function GrillzSection() {
  return (
    <section className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white flex flex-col lg:inline-flex lg:flex-row justify-start items-start lg:items-end gap-1 lg:gap-3.5 sticky top-0 z-10">
        <div id="grillz" className="justify-start text-8xl lg:text-8xl text-black font-[900] font-['Archivo'] uppercase leading-[60px] lg:leading-[80px]">
          GRILLZ
        </div>
        <div className="hidden lg:block w-60 h-6 justify-end text-blue text-sm font-[800] font-['Archivo']">
          item description
        </div>
      </div>

      {/* Unified Canvas - Mobile: Flex stacked, Desktop: Absolute positioned */}
      <div className="self-stretch flex flex-col gap-6 lg:relative lg:min-h-[700px] lg:pt-12">
        {/* Image 1 - Top Left Area */}
        <Link href="/grillz" className="block lg:absolute lg:left-[8%] lg:top-[5%] lg:w-[22%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/plainopen.avif"
            alt="Grillz Design 1"
            width={348}
            height={194}
            className="w-full h-auto"
          />
        </Link>

        {/* Image 2 - Top Right Area */}
        <Link href="/grillz" className="block lg:absolute lg:right-[5%] lg:top-0 lg:w-[35%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/playstation1.avif"
            alt="Grillz Design 2"
            width={481}
            height={223}
            className="w-full h-auto"
          />
        </Link>

        {/* Image 3 - Center Area */}
        <Link href="/grillz" className="block lg:absolute lg:left-[35%] lg:top-[25%] lg:w-[18%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/curvy.avif"
            alt="Grillz Design 3"
            width={223}
            height={103}
            className="w-full h-auto"
          />
        </Link>

        {/* CTA Text - Left Center */}
        <div className="flex flex-col gap-2 lg:absolute lg:left-0 lg:top-[45%]">
          <Link href="/grillz" className="text-4xl lg:text-7xl text-black font-[800] font-['Archivo'] uppercase leading-tight lg:whitespace-nowrap transition-colors cursor-pointer">
            FIND YOUR SMILE
          </Link>
          <Link
            href="/grillz"
            className="text-lg font-[800] font-['Archivo'] text-yellow-400 transition-colors"
          >
            EXPLORE
          </Link>
        </div>

        {/* Image 4 - Bottom Left */}
        <Link href="/grillz" className="block lg:absolute lg:left-[8%] lg:bottom-[8%] lg:w-[20%] hover:scale-105 transition-transform cursor-pointer">
          <Image
            src="/grillzsection/tribal.avif"
            alt="Grillz Design 4"
            width={269}
            height={155}
            className="w-full h-auto"
          />
        </Link>

        {/* Image 5 - Bottom Right */}
        <Link href="/grillz" className="block lg:absolute lg:right-[12%] lg:bottom-[5%] lg:w-[32%] hover:scale-105 transition-transform cursor-pointer">
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

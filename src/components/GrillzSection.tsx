import Image from "next/image";
import Link from "next/link";

export default function GrillzSection() {
  return (
    <section className="self-stretch flex flex-col justify-start items-start gap-3 lg:gap-6">
      {/* Section Header - Desktop only, sticky */}
      <div className="hidden lg:flex self-stretch pr-[5px] pt-4 bg-white flex-col lg:inline-flex lg:flex-row justify-start items-start lg:items-end gap-1 lg:gap-3.5 sticky top-0 z-10">
        <div id="grillz" className="justify-start text-8xl text-black font-black font-['Archivo'] uppercase leading-[80px]">
          GRILLZ
        </div>
      </div>

      {/* Mobile & Desktop Container */}
      <div className="self-stretch h-[44.75rem] lg:h-[47.3rem] relative">
        {/* Mobile Layout - Hidden on Desktop */}
        <div className="lg:hidden w-full h-full relative">
          {/* Grillz Header */}
          <h2 className="absolute left-0 top-[26.75rem] text-4xl text-black font-black font-['Archivo'] uppercase leading-9">
            Grillz
          </h2>

          {/* EXPLORE CTA */}
          <Link
            href="/grillz"
            className="absolute left-0 top-[29.875rem] text-4xl text-contrast font-black font-['Archivo'] uppercase leading-9 hover:opacity-80 transition-opacity"
          >
            EXPLORE
          </Link>

          {/* Mobile Images */}
          {/* Image 8 - Top Left with rotation */}
          <Link href="/grillz" className="absolute w-[15rem] h-auto left-[-1.25rem] top-[12.625rem] origin-top-left rotate-[20.62deg] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image8.avif"
              alt="Grillz Design 8"
              width={239}
              height={121}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 6 - Top Right */}
          <Link href="/grillz" className="absolute w-[15rem] h-auto left-[8rem] top-[6.375rem] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image6.avif"
              alt="Grillz Design 6"
              width={240}
              height={140}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 9 - Bottom Left */}
          <Link href="/grillz" className="absolute w-[20rem] h-auto left-[1.0625rem] top-[35.8125rem] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image9.avif"
              alt="Grillz Design 9"
              width={320}
              height={118}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 4 - Bottom Right */}
          <Link href="/grillz" className="absolute w-[14rem] h-auto left-[11.6875rem] top-[32.5625rem] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image4.avif"
              alt="Grillz Design 4"
              width={221}
              height={138}
              className="w-full h-auto"
            />
          </Link>
        </div>

        {/* Desktop Layout - Hidden on Mobile */}
        <div className="hidden lg:block w-full h-full relative">
          {/* EXPLORE CTA - Desktop */}
          <Link
            href="/grillz"
            className="absolute left-0 top-[24rem] xl:top-[25.875rem] text-5xl xl:text-6xl 2xl:text-7xl text-contrast font-black font-['Archivo'] uppercase leading-tight xl:leading-[5rem] hover:opacity-80 transition-opacity"
          >
            EXPLORE
          </Link>

          {/* Desktop Images with Responsive Breakpoints */}

          {/* Image 2 - Center with rotation */}
          <Link href="/grillz" className="absolute w-[16rem] xl:w-[18rem] 2xl:w-[19rem] h-auto left-[23rem] xl:left-[25.25rem] top-[12rem] xl:top-[13.5rem] origin-top-left rotate-[10.91deg] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image2.avif"
              alt="Grillz Design 2"
              width={306}
              height={171}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 8 - Top Left */}
          <Link href="/grillz" className="absolute w-[20rem] xl:w-[22rem] 2xl:w-[23.25rem] h-auto left-0 top-[3rem] xl:top-[3.8125rem] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image8.avif"
              alt="Grillz Design 8"
              width={372}
              height={189}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 6 - Top Right */}
          <Link href="/grillz" className="absolute w-[23rem] xl:w-[25rem] 2xl:w-[26.75rem] h-auto left-[40rem] xl:left-[44rem] top-0 hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image6.avif"
              alt="Grillz Design 6"
              width={428}
              height={250}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 3 - Right with rotation */}
          <Link href="/grillz" className="absolute w-[14rem] xl:w-[15rem] 2xl:w-[16rem] h-auto left-[52rem] xl:left-[56.35rem] top-[14rem] xl:top-[15.625rem] origin-top-left rotate-[37.87deg] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image3.avif"
              alt="Grillz Design 3"
              width={257}
              height={179}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 9 - Bottom Left */}
          <Link href="/grillz" className="absolute w-[26rem] xl:w-[28rem] 2xl:w-[29.875rem] h-auto left-[0.9375rem] top-[34rem] xl:top-[36rem] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image9.avif"
              alt="Grillz Design 9"
              width={478}
              height={176}
              className="w-full h-auto"
            />
          </Link>

          {/* Image 4 - Bottom Right */}
          <Link href="/grillz" className="absolute w-[28rem] xl:w-[30rem] 2xl:w-[31.9375rem] h-auto left-[40rem] xl:left-[45.1875rem] top-[31rem] xl:top-[31rem] hover:scale-105 transition-transform">
            <Image
              src="/grillzsection/image4.avif"
              alt="Grillz Design 4"
              width={511}
              height={319}
              className="w-full h-auto scale-x-[-1]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

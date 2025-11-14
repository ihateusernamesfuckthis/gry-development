"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function GrillzPage() {
  return (
    <main className="lg:flex lg:h-screen">
      <Nav />
      <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col pt-14 lg:pt-0">
        {/* CONTENT - Remove horizontal padding to prevent overflow */}
        <div
          id="grillz"
          className="self-stretch flex flex-col justify-start items-center gap-12 lg:gap-16"
        >
          {/* HERO SECTION */}
          <section className="self-stretch relative py-8 lg:py-0 lg:h-[567px] flex flex-col justify-start items-start gap-6 px-4 lg:px-0">
            {/* GRILLZ HEADER */}
            <div className="self-stretch pt-4 pb-4 lg:pt-4 bg-white px-4 lg:px-0">
              <h1 className="text-4xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px]">
                GRILLZ
              </h1>
            </div>

            {/* Desktop decorative images - hidden on mobile */}
            <Image
              className="hidden lg:block absolute w-[28rem] xl:w-[35rem] 2xl:w-[39rem] h-auto left-[40%] xl:left-[43%] top-[12rem] xl:top-[13rem] origin-top-left rotate-[-7.35deg]"
              src="/grillzPage/hero/hero1.avif"
              alt="Decorative grillz"
              width={629}
              height={363}
            />
            <Image
              className="hidden lg:block absolute w-[24rem] xl:w-[28rem] 2xl:w-[32rem] h-auto left-0 top-[6rem] xl:top-[7rem]"
              src="/grillzPage/hero/hero2.avif"
              alt="Decorative grillz"
              width={508}
              height={235}
            />

            {/* Mobile decorative image - top */}
            <div className="lg:hidden w-full flex justify-center">
              <Image
                src="/grillzPage/hero/hero1.avif"
                alt="Decorative grillz"
                width={382}
                height={176}
                className="w-full max-w-sm h-auto"
              />
            </div>

            {/* Hero CTA */}
            <div className="w-full lg:max-w-[56rem] lg:absolute lg:left-0 lg:bottom-[2rem] flex flex-col gap-4">
              <p className="w-full lg:max-w-[30rem] text-black text-sm font-extrabold font-['Archivo']">
                Book your custom grillz session
              </p>
              <div className="flex flex-row items-center gap-8">
                <a
                  href="https://vmuccc-by.myshopify.com/products/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-36 h-12 bg-black overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center"
                >
                  <div className="text-center text-white text-lg font-extrabold font-['Archivo']">
                    BOOK
                  </div>
                </a>
                <button
                  className="w-32 h-12 text-center text-black text-lg font-extrabold font-['Archivo'] hover:opacity-70 transition-opacity"
                  onClick={() => {
                    document
                      .getElementById("process-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Mobile decorative image - bottom */}
            <div className="lg:hidden w-full flex justify-center mt-4">
              <Image
                src="/grillzPage/hero/hero2.avif"
                alt="Decorative grillz"
                width={365}
                height={211}
                className="w-full max-w-sm h-auto origin-center rotate-[-7.35deg]"
              />
            </div>
          </section>

          {/* THE PROCESS SECTION */}
          <section
            id="process-section"
            className="self-stretch py-12 lg:py-24 flex flex-col gap-2.5 px-4 lg:px-7"
          >
            <h2 className="text-lg lg:text-8xl pb-6 text-black font-extrabold lg:font-black font-['Archivo'] lg:uppercase lg:leading-[80px]">
              THE PROCESS
            </h2>

            {/* STEP 1 */}
            <div className="self-stretch pb-12 lg:pb-16 relative flex flex-col gap-4">
              <h3 className="text-4xl lg:text-7xl text-black font-black font-['Archivo'] uppercase leading-9 lg:leading-[66px] max-w-full lg:max-w-[628px]">
                BOOK A CONSULTATION
              </h3>
              <p className="text-black text-sm font-extrabold font-['Archivo'] max-w-full lg:max-w-[480px]">
                Book your appointment directly here on the site.
                You can choose from our most popular styles - Plain, Open, Heart, Organic, or Fang - or book a session for a fully custom design. 
                Custom pieces are discussed and priced during your consultation to ensure the perfect fit and vision.

              </p>
              {/* Desktop decorative image */}
              <Image
                className="hidden lg:block absolute w-[18rem] xl:w-[22rem] 2xl:w-[24rem] h-auto right-0 top-[4rem] xl:top-[4.25rem]"
                src="/grillzPage/process/step1.avif"
                alt="Decorative grillz"
                width={378}
                height={191}
              />
              {/* Mobile decorative image */}
              <div className="lg:hidden w-full flex justify-end mt-4">
                <Image
                  src="/grillzPage/process/step1.avif"
                  alt="Decorative grillz"
                  width={226}
                  height={114}
                  className="w-56 h-auto"
                />
              </div>
            </div>

            {/* STEP 2 */}
            <div className="self-stretch py-12 lg:py-16 relative flex flex-col items-start lg:items-end gap-4">
              <h3 className="text-4xl lg:text-7xl text-black font-black font-['Archivo'] uppercase leading-9 lg:leading-[66px] max-w-full lg:max-w-[47rem] text-left lg:text-right">
                GET YOUR IMPRESSION
              </h3>
              <p className="text-black text-sm font-extrabold font-['Archivo'] max-w-full lg:max-w-[30rem] text-left lg:text-right">
                We take a precise dental impression to ensure a perfect, comfortable fit.
                This mold becomes the foundation for crafting your unique piece, and any special design details are finalized during this step.

              </p>
              {/* Desktop decorative image */}
              <Image
                className="hidden lg:block absolute w-[22rem] xl:w-[26rem] 2xl:w-[29rem] h-auto left-0 top-[1.5rem] xl:top-[1.625rem]"
                src="/grillzPage/process/step2.avif"
                alt="Decorative grillz"
                width={458}
                height={211}
              />
              {/* Mobile decorative image */}
              <div className="lg:hidden w-full flex justify-start mt-4">
                <Image
                  src="/grillzPage/process/step2.avif"
                  alt="Decorative grillz"
                  width={260}
                  height={120}
                  className="w-64 h-auto"
                />
              </div>
            </div>

            {/* STEP 3 */}
            <div className="self-stretch pt-12 lg:pt-16 relative flex flex-col gap-4">
              <h3 className="text-4xl lg:text-7xl text-black font-black font-['Archivo'] uppercase leading-9 lg:leading-[66px] max-w-full">
                COLLECT YOUR
                <br />
                NEW GRILLZ
              </h3>
              <p className="text-black text-sm font-extrabold font-['Archivo'] max-w-full lg:max-w-[480px]">
                Your custom grillz are handcrafted and polished to perfection.
                Production can take up to 3 weeks before your piece is ready.
                Once finished, you can pick it up in the same studio where your consultation took place.
              </p>
              {/* Desktop decorative image */}
              <Image
                className="hidden lg:block absolute w-[18rem] xl:w-[22rem] 2xl:w-[24rem] h-auto right-0 top-[0.75rem] xl:top-[0.9375rem] origin-top-left rotate-[12.73deg]"
                src="/grillzPage/process/step3.avif"
                alt="Decorative grillz"
                width={410}
                height={163}
              />
              {/* Mobile decorative image */}
              <div className="lg:hidden w-full flex justify-end">
                <Image
                  src="/grillzPage/process/step3.avif"
                  alt="Decorative grillz"
                  width={287}
                  height={114}
                  className="w-72 h-auto origin-center rotate-[12.73deg]"
                />
              </div>
            </div>
          </section>

          {/* THE SELECTION SECTION */}
          <section className="self-stretch pt-12 lg:pt-36 flex flex-col gap-4 px-4 lg:px-7">
            <h2 className="text-lg lg:text-8xl text-black font-extrabold lg:font-black font-['Archivo'] lg:uppercase lg:leading-[80px]">
              THE SELECTION
            </h2>

            {/* BANNERS */}
            <div className="self-stretch flex flex-col gap-5">

              {/* OPEN FACE */}
              <div className="w-full h-96 relative bg-gray-800 overflow-hidden">
                <Image
                  src="/grillzPage/grillzBanner/openface.avif"
                  alt="Open Face Grillz"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 lg:left-[40px] bottom-12 lg:bottom-[120px] text-white text-4xl lg:text-8xl font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px] z-10">
                  OPEN FACE
                </div>
              </div>

              {/* PLAIN */}
              <div className="w-full h-96 relative bg-gray-800 overflow-hidden">
                <Image
                  src="/grillzPage/grillzBanner/plain.avif"
                  alt="Plain Grillz"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 lg:left-[40px] bottom-12 lg:bottom-[120px] text-white text-4xl lg:text-8xl font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px] z-10">
                  PLAIN
                </div>
              </div>

              {/* HEART */}
              <div className="w-full h-96 relative bg-gray-800 overflow-hidden">
                <Image
                  src="/grillzPage/grillzBanner/heart.avif"
                  alt="Heart Grillz"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 lg:left-[40px] bottom-12 lg:bottom-[120px] text-white text-4xl lg:text-8xl font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px] z-10">
                  HEART
                </div>
              </div>

              {/* ORGANIC */}
              <div className="w-full h-96 relative bg-gray-800 overflow-hidden">
                <Image
                  src="/grillzPage/grillzBanner/organic.avif"
                  alt="Organic Grillz"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 lg:left-[40px] bottom-12 lg:bottom-[120px] text-white text-4xl lg:text-8xl font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px] z-10">
                  ORGANIC
                </div>
              </div>

              {/* FANG */}
              <div className="w-full h-96 relative bg-gray-800 overflow-hidden">
                <Image
                  src="/grillzPage/grillzBanner/fang.avif"
                  alt="Fang Grillz"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 lg:left-[40px] bottom-12 lg:bottom-[120px] text-white text-4xl lg:text-8xl font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px] z-10">
                  FANG
                </div>
              </div>
            </div>
          </section>

          {/* CUSTOM GRILLZ SECTION */}
          <section className="self-stretch pt-12 lg:pt-24 pb-24 lg:pb-36 flex flex-col gap-4 px-4 lg:px-7">
            <div className="self-stretch text-center text-black text-lg font-extrabold font-['Archivo']">
              OR...
            </div>

            <div className="self-stretch pt-12 lg:pt-24 pb-6 flex flex-col justify-center items-center">
              <h2 className="text-center text-4xl lg:text-8xl font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px]">
                <span className="text-black">MAKE IT </span>
                <span className="text-black lg:text-contrast">CUSTOM</span>
              </h2>
            </div>

            <div className="self-stretch pb-12 flex justify-center">
              <p className="w-full max-w-full lg:max-w-[1143px] text-center text-black text-sm font-extrabold font-['Archivo']">
                One tooth. Full set. You decide.
                <br />
                Custom grillz made to match your vision.
                <br />
                <br />
                950 DKK PER TOOTH
                <br />
                Crafted in Sterling Silver, 14K gold, or 18K gold.
              </p>
            </div>

            <div className="self-stretch flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-8">
              <a
                href="https://vmuccc-by.myshopify.com/products/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-36 h-12 bg-black overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <div className="text-center text-white text-lg font-extrabold font-['Archivo']">
                  BOOK
                </div>
              </a>
              <Link
                href="/faq"
                className="w-36 h-12 bg-black overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center"
              >
                <div className="text-center text-white text-lg font-extrabold font-['Archivo']">
                  QUESTIONS
                </div>
              </Link>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}

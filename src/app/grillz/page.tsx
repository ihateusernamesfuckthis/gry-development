"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function GrillzPage() {
  return (
    <main className="lg:flex">
      <Nav />
      <div className="w-full lg:flex-1 flex flex-col gap-12">
        {/* CONTENT */}
        <div
          id="grillz"
          data-layer="CONTENT"
          className="Content self-stretch pl-0 lg:pl-7 pr-0 lg:pr-10 inline-flex flex-col justify-start items-center gap-12 lg:gap-24"
        >
          {/* GRILLZ SECTION */}
          <div
            data-layer="GRILLZ SECTION"
            className="GrillzSection self-stretch flex flex-col justify-start items-start gap-6"
          >
            {/* GRILLZ HEADER */}
            <div
              data-layer="GRILLZ HEADER"
              className="GrillzHeader self-stretch pr-[5px] pt-4 bg-white flex flex-col justify-center items-start gap-3.5"
            >
              <div
                data-layer="GRILLZ"
                className="Grillz justify-start text-5xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-[60px] lg:leading-[80px]"
              >
                GRILLZ
              </div>
            </div>

            {/* HERO - Mobile: stacked, Desktop: absolute positioned */}
            <div
              data-layer="HERO"
              className="Hero self-stretch py-8 lg:h-[567px] lg:py-0 relative"
            >
              {/* Decorative Images - Hidden on mobile, shown on desktop */}
              <Image
                data-layer="GrillTransparent3 1"
                className="hidden lg:block Grilltransparent31 w-[629.15px] h-96 left-[487.23px] top-[209.51px] absolute origin-top-left rotate-[-7.35deg]"
                src="/GrillzPlaceholders/GrillTransparent3.png"
                alt="Grill transparent 3"
                width={629}
                height={363}
              />
              <Image
                data-layer="GrillTransparent4 1"
                className="hidden lg:block Grilltransparent41 w-[508.17px] h-60 left-0 top-[77px] absolute"
                src="/GrillzPlaceholders/GrillTransparent4.png"
                alt="Grill transparent 4"
                width={508}
                height={235}
              />
              {/* Mobile-only decorative grillz image - Top */}
              <div className="lg:hidden w-full flex justify-center mb-6">
                <Image
                  src="/GrillzPlaceholders/GrillTransparent4.png"
                  alt="Decorative grillz"
                  width={300}
                  height={140}
                  className="w-3/4 h-auto opacity-80"
                />
              </div>

              {/* CTA - Mobile: normal flow, Desktop: absolute positioned */}
              <div
                data-layer="HERO CTA"
                className="HeroCta w-full lg:w-[895px] lg:left-0 lg:top-[439px] lg:absolute inline-flex flex-col justify-start items-start gap-4 px-4 lg:px-0"
              >
                <div
                  data-layer="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  className="LoremIpsumDolorSitAmetConsecteturAdipiscingElitSedDoEiusmodTemporIncididuntUtLaboreEtDoloreMagnaAliqua w-full lg:w-[480px] justify-start text-black text-sm font-extrabold font-['Archivo']"
                >
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </div>
                <div
                  data-layer="BUTTONS"
                  className="Buttons inline-flex justify-start items-center gap-8"
                >
                  <a
                    href="https://vmuccc-by.myshopify.com/products/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-layer="EXPLORECTA"
                    className="Explorecta w-36 h-12 relative bg-black overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <div
                      data-layer="BOOK"
                      className="Book w-36 left-0 top-[15px] absolute text-center justify-start text-white text-lg font-extrabold font-['Archivo']"
                    >
                      BOOK
                    </div>
                  </a>
                  <button
                    data-layer="LEARN MORE"
                    className="LearnMore w-32 h-12 text-center justify-center text-black text-lg font-extrabold font-['Archivo'] hover:opacity-70 transition-opacity"
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

              {/* Mobile-only decorative grillz image - Bottom */}
              <div className="lg:hidden w-full flex justify-center mt-8">
                <Image
                  src="/GrillzPlaceholders/GrillTransparent5.png"
                  alt="Decorative grillz"
                  width={300}
                  height={140}
                  className="w-3/4 h-auto opacity-80"
                />
              </div>
            </div>

            {/* PROCESS SECTION */}
            <div
              id="process-section"
              data-layer="PROCESS SECTION"
              className="ProcessSection self-stretch pt-12 lg:pt-24 flex flex-col justify-start items-start gap-2.5"
            >
              <div
                data-layer="THE PROCESS"
                className="TheProcess w-32 text-center justify-end text-black text-lg font-extrabold font-['Archivo']"
              >
                THE PROCESS
              </div>

              {/* STEP 1 */}
              <div
                data-layer="STEP 1"
                className="Step1 self-stretch pb-16 relative flex flex-col justify-start items-start gap-4"
              >
                <div
                  data-layer="BOOK A CONSULTATION"
                  className="BookAConsultation w-full max-w-7xl justify-start text-3xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-tight lg:leading-[80px]"
                >
                  BOOK A CONSULTATION
                </div>
                <div
                  data-layer="choose a time"
                  className="ChooseATime w-full lg:w-[480px] justify-start text-black text-sm font-extrabold font-['Archivo']"
                >
                  choose a time
                </div>
                <Image
                  data-layer="GrillTransparent1 2"
                  className="hidden lg:block Grilltransparent12 w-72 h-36 left-[858px] top-[8px] absolute"
                  src="/GrillzPlaceholders/GrillTransparent2.png"
                  alt="Grill transparent 2"
                  width={285}
                  height={144}
                />
              </div>

              {/* Mobile-only decorative grillz image - Between Step 1 & 2 */}
              <div className="lg:hidden w-full flex justify-center py-8">
                <Image
                  src="/GrillzPlaceholders/GrillTransparent3.png"
                  alt="Decorative grillz"
                  width={300}
                  height={140}
                  className="w-2/3 h-auto opacity-70"
                />
              </div>

              {/* STEP 2 */}
              <div
                data-layer="STEP 2"
                className="Step2 self-stretch py-16 relative flex flex-col justify-start items-end gap-4"
              >
                <div
                  data-layer="GET YOUR IMPRESSION"
                  className="GetYourImpression w-full max-w-3xl text-right justify-start text-3xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-tight lg:leading-[80px]"
                >
                  GET YOUR IMPRESSION
                </div>
                <div
                  data-layer="come by the studio and we get your dental impression"
                  className="ComeByTheStudioAndWeGetYourDentalImpression w-full lg:w-[480px] text-right justify-start text-black text-sm font-extrabold font-['Archivo']"
                >
                  come by the studio and we get your dental impression
                </div>
                <Image
                  data-layer="GrillTransparent5 2"
                  className="hidden lg:block Grilltransparent52 w-[458px] h-52 left-0 top-[66px] absolute"
                  src="/GrillzPlaceholders/GrillTransparent5.png"
                  alt="Grill transparent 5"
                  width={458}
                  height={211}
                />
              </div>

              {/* Mobile-only decorative grillz image - Between Step 2 & 3 */}
              <div className="lg:hidden w-full flex justify-center py-8">
                <Image
                  src="/GrillzPlaceholders/GrillTransparent6.png"
                  alt="Decorative grillz"
                  width={300}
                  height={120}
                  className="w-2/3 h-auto opacity-70"
                />
              </div>

              {/* STEP 3 */}
              <div
                data-layer="STEP 3"
                className="Step3 self-stretch pt-16 relative flex flex-col justify-start items-start gap-4"
              >
                <div
                  data-layer="COLLECT YOUR NEW GRILLZ"
                  className="CollectYourNewGrillz w-full max-w-7xl justify-start text-3xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-tight lg:leading-[80px]"
                >
                  COLLECT YOUR
                  <br />
                  NEW GRILLZ
                </div>
                <div
                  data-layer="give us X days and your grillz will be ready for collection at the studio"
                  className="GiveUsXDaysAndYourGrillzWillBeReadyForCollectionAtTheStudio w-full lg:w-[480px] justify-start text-black text-sm font-extrabold font-['Archivo']"
                >
                  give us X days and your grillz will be ready for collection
                  at the studio
                </div>
                <Image
                  data-layer="GrillTransparent6 2"
                  className="hidden lg:block Grilltransparent62 w-80 h-32 left-[851.43px] top-0 absolute origin-top-left rotate-[12.73deg]"
                  src="/GrillzPlaceholders/GrillTransparent6.png"
                  alt="Grill transparent 6"
                  width={313}
                  height={124}
                />
              </div>
            </div>

            {/* STANDARD GRILLZ */}
            <div
              data-layer="STANDARDGRILLZ"
              className="Standardgrillz self-stretch pt-24 flex flex-col justify-start items-start gap-4"
            >
              <div
                data-layer="THE SELECTION"
                className="TheSelection w-48 justify-end text-black text-lg font-extrabold font-['Archivo']"
              >
                THE SELECTION
              </div>
              <div
                data-layer="BANNERS"
                className="Banners self-stretch flex flex-col justify-start items-start gap-5"
              >
                {/* BANNER 1 - HEART */}
                <div
                  data-layer="BANNER1"
                  className="Banner1 w-full lg:w-[1143px] h-96 relative bg-gray-800 overflow-hidden"
                >
                  <Image
                    src="/grillzPage/grillzBanner/heart.avif"
                    alt="Heart Grillz"
                    fill
                    className="object-cover"
                  />
                  <div
                    data-layer="HEART"
                    className="Heart w-full left-4 lg:left-[40px] top-[281px] absolute justify-start text-5xl lg:text-8xl text-white font-black font-['Archivo'] uppercase leading-[60px] lg:leading-[80px] z-10"
                  >
                    HEART
                  </div>
                </div>

                {/* BANNER 2 - FANG */}
                <div
                  data-layer="BANNER2"
                  className="Banner2 w-full lg:w-[1143px] h-96 relative bg-gray-800 overflow-hidden"
                >
                  <Image
                    src="/grillzPage/grillzBanner/fang.avif"
                    alt="Fang Grillz"
                    fill
                    className="object-cover"
                  />
                  <div
                    data-layer="FANG"
                    className="Fang w-full left-4 lg:left-[40px] top-[281px] absolute justify-start text-5xl lg:text-8xl text-white font-black font-['Archivo'] uppercase leading-[60px] lg:leading-[80px] z-10"
                  >
                    FANG
                  </div>
                </div>

                {/* BANNER 3 - PLAIN */}
                <div
                  data-layer="BANNER3"
                  className="Banner3 w-full lg:w-[1143px] h-96 relative bg-gray-800 overflow-hidden"
                >
                  <Image
                    src="/grillzPage/grillzBanner/plain.avif"
                    alt="Plain Grillz"
                    fill
                    className="object-cover"
                  />
                  <div
                    data-layer="PLAIN"
                    className="Plain w-full left-4 lg:left-[40px] top-[281px] absolute justify-start text-5xl lg:text-8xl text-white font-black font-['Archivo'] uppercase leading-[60px] lg:leading-[80px] z-10"
                  >
                    PLAIN
                  </div>
                </div>

                {/* BANNER 4 - ORGANIC */}
                <div
                  data-layer="BANNER4"
                  className="Banner4 w-full lg:w-[1143px] h-96 relative bg-gray-800 overflow-hidden"
                >
                  <Image
                    src="/grillzPage/grillzBanner/organic.avif"
                    alt="Organic Grillz"
                    fill
                    className="object-cover"
                  />
                  <div
                    data-layer="ORGANIC"
                    className="Organic w-full left-4 lg:left-[40px] top-[281px] absolute justify-start text-5xl lg:text-8xl text-white font-black font-['Archivo'] uppercase leading-[60px] lg:leading-[80px] z-10"
                  >
                    ORGANIC
                  </div>
                </div>

                {/* BANNER 5 - OPEN FACE */}
                <div
                  data-layer="BANNER5"
                  className="Banner5 w-full lg:w-[1143px] h-96 relative bg-gray-800 overflow-hidden"
                >
                  <Image
                    src="/grillzPage/grillzBanner/openface.avif"
                    alt="Open Face Grillz"
                    fill
                    className="object-cover"
                  />
                  <div
                    data-layer="OPEN FACE"
                    className="OpenFace w-full left-4 lg:left-[40px] top-[281px] absolute justify-start text-5xl lg:text-8xl text-white font-black font-['Archivo'] uppercase leading-[60px] lg:leading-[80px] z-10"
                  >
                    OPEN FACE
                  </div>
                </div>
              </div>
            </div>

            {/* CUSTOM GRILLZ */}
            <div
              data-layer="CUSTOMGRILLZ"
              className="Customgrillz self-stretch pt-24 pb-36 flex flex-col justify-start items-start gap-4"
            >
              <div
                data-layer="OR..."
                className="Or self-stretch text-center justify-end text-black text-lg font-extrabold font-['Archivo']"
              >
                OR...
              </div>
              <div
                data-layer="CUSTOM"
                className="Custom self-stretch pt-24 pb-6 flex flex-col justify-center items-center gap-2.5"
              >
                <div
                  data-layer="MAKE IT CUSTOM"
                  className="MakeItCustom w-full max-w-7xl text-center justify-start text-3xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-tight lg:leading-[80px]"
                >
                  MAKE IT CUSTOM
                </div>
              </div>
              <div
                data-layer="BODYTEXT"
                className="Bodytext self-stretch pb-12 inline-flex justify-center items-center gap-2.5"
              >
                <div
                  data-layer="from 1 tooth to full mouth, the choice is yours. we'll work with you and create your own bespoke GRILLZ. 900 DKK PER TOOTH 925 STERLING ONLY"
                  className="From1ToothToFullMouthTheChoiceIsYoursWeLlWorkWithYouAndCreateYourOwnBespokeGrillz900DkkPerTooth925SterlingOnly w-full lg:w-[1143px] text-center justify-start text-black text-sm font-extrabold font-['Archivo'] px-4 lg:px-0"
                >
                  from 1 tooth to full mouth, the choice is yours.
                  <br />
                  we&apos;ll work with you and create your own bespoke GRILLZ.
                  <br />
                  <br />
                  900 DKK PER TOOTH
                  <br />
                  925 STERLING ONLY
                </div>
              </div>
              <div
                data-layer="BUTTONS"
                className="Buttons self-stretch inline-flex justify-center items-center gap-8"
              >
                <a
                  href="https://vmuccc-by.myshopify.com/products/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-layer="EXPLORECTA"
                  className="Explorecta w-36 h-12 relative bg-black overflow-hidden hover:opacity-80 transition-opacity"
                >
                  <div
                    data-layer="BOOK"
                    className="Book w-36 left-0 top-[15px] absolute text-center justify-start text-white text-lg font-extrabold font-['Archivo']"
                  >
                    BOOK
                  </div>
                </a>
                <Link
                  href="/contact"
                  data-layer="CONTACTCTA"
                  className="Contactcta w-36 h-12 relative bg-black overflow-hidden hover:opacity-80 transition-opacity"
                >
                  <div
                    data-layer="QUESTIONS"
                    className="Questions w-36 left-0 top-[15px] absolute text-center justify-start text-white text-lg font-extrabold font-['Archivo']"
                  >
                    QUESTIONS
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}

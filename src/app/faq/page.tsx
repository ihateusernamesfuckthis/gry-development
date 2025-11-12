import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function FAQPage() {
  return (
    <main className="lg:flex lg:h-screen">
      <Nav />
      <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col gap-12 pt-14 lg:pt-0">
        <div className="flex flex-col justify-start items-start gap-12 px-4 lg:px-7 pb-12">
          {/* Page Header */}
          <div className="self-stretch pr-[5px] pt-4 bg-white flex justify-start items-end gap-3.5">
            <div className="justify-start text-black text-4xl lg:text-8xl font-[900] font-['Archivo'] uppercase leading-9 lg:leading-[80px]">
              FAQ
            </div>
          </div>

          {/* GRILLZ Section */}
          <section className="self-stretch flex flex-col gap-6">
            <h2 className="text-black text-2xl lg:text-4xl font-[900] font-['Archivo'] uppercase">
              GRILLZ
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  How do I order a custom grillz?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Each set is made-to-order. Once you book your impression appointment, production begins.
                  Please allow 3 weeks from your impression date for your finished grillz to be ready.
                </p>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed mt-2">
                  Frequently ordered styles are displayed on the website. For specific custom designs, please
                  book an appointment - extra time will be dedicated to discussing your vision in detail. All ideas
                  are welcome.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Can I take my own dental impression?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  For best results, we always recommend having your impression made in the studio or by a
                  professional dentist or dental technician. Incorrect impressions may affect the fit and cannot be
                  refunded.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Are grillz safe to wear?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Yes, when made correctly and worn responsibly. Grillz are for fashion use only and should not
                  be worn while eating or sleeping. If you experience discomfort, remove them immediately.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Can I return or exchange my grillz?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Because each piece is custom-made to your specifications, all grillz are final sale - no returns or
                  exchanges unless there&apos;s a confirmed production defect.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  What materials do you use?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  We use precious metals only - 100% sterling silver and solid gold (14k–18k). All grillz are
                  nickel-free and made with materials approved for mouth contact.
                </p>
              </div>
            </div>
          </section>

          {/* JEWELRY Section */}
          <section className="self-stretch flex flex-col gap-6">
            <h2 className="text-black text-2xl lg:text-4xl font-[900] font-['Archivo'] uppercase">
              JEWELRY
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Are your rings and jewelry handmade?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Yes. Every piece is handcrafted in Copenhagen with care, precision, and an individual finish.
                  Small variations are part of the charm of handmade jewelry.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  How do I know my ring size?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Your ring size is the circumference of your finger in millimeters. You can measure it by wrapping
                  a thin thread around your finger, marking where it overlaps, then measuring the length in
                  millimeters.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Do you offer resizing or repairs?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  We don&apos;t offer resizing for made-to-order rings, so please double-check your size before
                  ordering. Repairs may be possible in certain cases — contact us with photos for review.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  What materials do you use for jewelry?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  We use high-quality sterling silver, completely nickel-free.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  How should I care for my jewelry?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Store your pieces in a dry place, away from humidity and chemicals. Clean gently with a soft
                  cloth. For grillz and mouth-related items, never use harsh cleaning products.
                </p>
              </div>
            </div>
          </section>

          {/* SHIPPING & ORDERS Section */}
          <section className="self-stretch flex flex-col gap-6">
            <h2 className="text-black text-2xl lg:text-4xl font-[900] font-['Archivo'] uppercase">
              SHIPPING &amp; ORDERS
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Where do you ship from?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  All items are made and shipped from Copenhagen, Denmark.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  Do you ship internationally?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Yes. We ship worldwide. Shipping times and costs vary depending on your location.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  How long does production take?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Production time depends on customization and demand. Grillz usually take around 3 weeks
                  from your impression date. Jewelry production typically takes 1-3 weeks.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  How can I track my order?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  Once your order ships, you&apos;ll receive a confirmation email with a tracking link.
                </p>
              </div>

              <div>
                <h3 className="text-black text-base lg:text-lg font-[800] font-['Archivo'] mb-2">
                  What if my package is lost or delayed?
                </h3>
                <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
                  We&apos;re not responsible for delays or losses caused by shipping carriers, but we&apos;ll always assist
                  you in contacting them and tracking your parcel.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="self-stretch flex flex-col gap-4 pt-6 border-t border-black/10">
            <h2 className="text-black text-lg lg:text-2xl font-[800] font-['Archivo']">
              Still have questions?
            </h2>
            <p className="text-black text-sm font-normal font-['Archivo'] leading-relaxed">
              Reach out at{" "}
              <a
                href="mailto:grygrillz.info@gmail.com"
                className="font-[800] hover:text-contrast transition-colors"
              >
                grygrillz.info@gmail.com
              </a>
              {" "}- we&apos;ll get back to you as soon as possible.
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}

"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="flex h-screen lg:h-screen">
      <Nav />
      <div className="w-full flex-1 overflow-y-auto flex flex-col pt-14 lg:pt-0">
        <section className="flex-grow self-stretch flex flex-col justify-start items-start gap-12 px-4 lg:px-7 pb-12">
          {/* Page Header */}
          <div className="self-stretch pt-4 bg-white flex justify-start items-end gap-3.5">
            <div className="justify-start text-black text-4xl lg:text-8xl font-[900] font-['Archivo'] uppercase leading-9 lg:leading-[80px]">
              CONTACT
            </div>
          </div>

          {/* Contact Information */}
          <div className="self-stretch flex flex-col items-center gap-12">
            <div className="w-full max-w-2xl flex flex-col gap-8 text-center">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg lg:text-xl text-black font-extrabold font-['Archivo'] uppercase">
                  EMAIL
                </h2>
                <a
                  href="mailto:contact@grygrillz.com"
                  className="text-sm lg:text-base text-black font-['Archivo'] hover:opacity-70 transition-opacity"
                >
                  contact@grygrillz.com
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg lg:text-xl text-black font-extrabold font-['Archivo'] uppercase">
                  STUDIO ADDRESS
                </h2>
                <address className="text-sm lg:text-base text-black font-['Archivo'] not-italic">
                  PRINSESSEGADE 52
                  <br />
                  1422, CPH
                </address>
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                <h2 className="text-lg lg:text-xl text-black font-extrabold font-['Archivo'] uppercase">
                  SOCIALS
                </h2>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://instagram.com/grygrillz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm lg:text-base text-black font-extrabold font-['Archivo'] hover:opacity-70 transition-opacity"
                  >
                    INSTAGRAM
                  </a>
                  <a
                    href="https://tiktok.com/@grygrillz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm lg:text-base text-black font-extrabold font-['Archivo'] hover:opacity-70 transition-opacity"
                  >
                    TIKTOK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}

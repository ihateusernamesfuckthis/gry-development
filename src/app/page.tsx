import Nav from "@/components/Nav";
import RingSection from "@/components/RingSection";
import TShirtSection from "@/components/TShirtSection";
import GrillzSection from "@/components/GrillzSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";

export default function Home() {
  return (
    <main className="relative">
      {/* Landing Hero */}
      <LandingHero />

      {/* Main content - starts after the landing hero */}
      <div className="relative lg:flex z-10 bg-white">
        <Nav />
        <div className="w-full lg:flex-1 flex flex-col gap-12">
          <GrillzSection />
          <RingSection />
          <TShirtSection
            name="TIDDY BEAR TEE"
            material="100% Cotton"
            price="1.000 DKK"
            imageNumber={1}
            handle="tiddy-bear-tee"
          />
          <ArchiveSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}

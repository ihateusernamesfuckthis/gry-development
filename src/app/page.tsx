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
      <div className="relative flex z-10 bg-white">
        <Nav />
        <div className="flex-1 flex flex-col gap-12">
          <GrillzSection />
          <RingSection />
          <TShirtSection />
          <ArchiveSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}

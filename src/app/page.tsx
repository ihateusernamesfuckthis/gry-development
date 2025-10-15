import Nav from "@/components/Nav";
import RingSection from "@/components/RingSection";
import TShirtSection from "@/components/TShirtSection";
import GrillzSection from "@/components/GrillzSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex">
      <Nav />
      <div className="flex-1 flex flex-col gap-12">
        <GrillzSection />
        <RingSection />
        <TShirtSection />
        <ArchiveSection />
        <Footer />
      </div>
    </main>
  );
}

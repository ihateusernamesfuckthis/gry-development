import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RingsPage() {
  return (
    <main className="flex">
      <Nav />
      <div className="flex-1 flex flex-col gap-12">
        <div className="self-stretch pl-0 pr-14 inline-flex flex-col justify-start items-center gap-24">
          {/* Content will go here */}
        </div>
        <Footer />
      </div>
    </main>
  );
}

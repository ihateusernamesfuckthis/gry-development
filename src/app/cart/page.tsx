import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartClient from "./CartClient";

export default function CartPage() {
  return (
    <main className="lg:flex lg:h-screen">
      <Nav />
      <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col gap-12">
        <div className="self-stretch pl-0 pr-0 lg:pr-14 inline-flex flex-col justify-start items-start gap-12 lg:gap-24">
          <CartClient />
        </div>
        <Footer />
      </div>
    </main>
  );
}

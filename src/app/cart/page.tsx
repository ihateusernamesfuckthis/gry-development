import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartClient from "./CartClient";

export default function CartPage() {
  return (
    <main className="flex">
      <Nav />
      <div className="flex-1 flex flex-col gap-12">
        <div className="self-stretch pl-0 pr-14 inline-flex flex-col justify-start items-start gap-24">
          <CartClient />
        </div>
        <Footer />
      </div>
    </main>
  );
}

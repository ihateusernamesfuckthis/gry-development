import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import ProductClient from "./ProductClient";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  title: string;
  description?: string;
  handle: string;
  images?: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    }>;
  };
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

async function getProduct(handle: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${handle}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex">
      <Nav />
      <div className="flex-1 flex flex-col gap-12">
        <div className="Content self-stretch pl-0 pr-14 inline-flex flex-col justify-start items-center gap-24">
          <ProductClient product={product} />
        </div>
        <Footer />
      </div>
    </main>
  );
}

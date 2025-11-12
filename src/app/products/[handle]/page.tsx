import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import ProductClient from "./ProductClient";
import Footer from "@/components/Footer";
import { shopifyFetch } from "@/lib/shopify/storefront";
import { ProductQueryResponse, Product } from "@/types/shopify";

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

async function getProduct(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<ProductQueryResponse>(PRODUCT_BY_HANDLE_QUERY, { handle });
    return data.data?.product || null;
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
    <main className="lg:flex lg:h-screen">
      <Nav />
      <div className="w-full lg:flex-1 lg:overflow-y-auto flex flex-col gap-12 pt-14 lg:pt-0">
        <div className="Content self-stretch pl-0 pr-0 lg:pr-14 inline-flex flex-col justify-start items-center gap-12 lg:gap-24">
          <ProductClient product={product} />
        </div>
        <Footer />
      </div>
    </main>
  );
}

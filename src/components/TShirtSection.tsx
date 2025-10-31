import Image from "next/image";
import Link from "next/link";

interface TShirtSectionProps {
  name: string;
  material: string;
  price: string;
  imageNumber: number;
  handle: string;
}

export default function TShirtSection({ name, material, price, imageNumber, handle }: TShirtSectionProps) {
  return (
    <section id="apparel" className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white flex flex-col lg:inline-flex lg:flex-row justify-start items-start lg:items-end gap-1 lg:gap-3.5 sticky top-0 z-10">
        <div className="justify-start text-8xl lg:text-8xl text-black font-[900] font-['Archivo'] uppercase leading-[60px] lg:leading-[80px] lg:whitespace-nowrap">
          TIDDY BEAR
        </div>
        <div className="hidden lg:block w-60 h-6 justify-end text-black text-sm font-[800] font-['Archivo']" /* item description subheader kan sætte ind i linjen under*/>

        </div>
      </div>

      {/* T-Shirt Display - Mobile: Stacked, Desktop: Side by side */}
      <div className="self-stretch inline-flex justify-start items-start gap-8">
        <Link href={`/products/${handle}`} className="flex-1 flex flex-col lg:flex-row justify-center items-center lg:items-end gap-6 lg:gap-8">
          {/* Image with hover effect */}
          <div className="flex-1 relative group cursor-pointer">
            <Image
              src={`/tshirtsection/tshirt${imageNumber}.avif`}
              alt={name}
              width={751}
              height={884}
              className="w-full h-auto object-contain"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
          </div>

          {/* Product Info */}
          <div className="pb-6 lg:pb-32 flex justify-start items-start gap-20">
            <div className="w-full lg:w-96 h-20 inline-flex flex-col justify-start items-start">
              <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
                {name}
              </div>
              <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
                {material}
              </div>
              <div className="self-stretch h-6 justify-end text-black text-base font-normal font-['Archivo']">
                {price}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

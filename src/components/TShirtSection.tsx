import Image from "next/image";
import Link from "next/link";

export default function TShirtSection() {
  return (
    <section id="apparel" className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5 sticky top-0 z-10">
        <div className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px] whitespace-nowrap">
          TIDDY BEAR
        </div>
        <div className="w-60 h-6 justify-end text-black text-sm font-[800] font-['Archivo']">
          item description
        </div>
      </div>

      {/* T-Shirt Display */}
      <div className="self-stretch inline-flex justify-start items-start gap-8">
        <Link href="/tshirt" className="flex-1 flex justify-center items-end gap-8">
          {/* Image with hover effect */}
          <div className="flex-1 relative group cursor-pointer">
            <Image
              src="/tshirtsection/tshirt1.png"
              alt="TIDDY BEAR T-Shirt"
              width={751}
              height={884}
              className="w-full h-auto object-contain"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
          </div>

          {/* Product Info */}
          <div className="pb-32 flex justify-start items-start gap-20">
            <div className="w-96 h-20 inline-flex flex-col justify-start items-start">
              <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
                T-SHIRT
              </div>
              <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
                Item Attributes
              </div>
              <div className="self-stretch h-6 justify-end text-black text-base font-normal font-['Archivo']">
                1.000 DKK
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

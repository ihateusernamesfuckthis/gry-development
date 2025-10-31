import Image from "next/image";
import Link from "next/link";

interface RingCardProps {
  name: string;
  material: string;
  price: string;
  imageNumber: number;
  handle: string;
}

export default function RingCard({ name, material, price, imageNumber, handle }: RingCardProps) {
  return (
    <Link href={`/products/${handle}`} className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-3">
      {/* Image with hover effect */}
      <div className="w-full h-96 lg:h-[497.10px] relative group cursor-pointer">
        <Image
          src={`/ringsection/ring${imageNumber}.avif`}
          alt={name}
          fill
          className="object-cover"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
      </div>

      {/* Product Info */}
      <div className="self-stretch inline-flex justify-start items-start gap-20">
        <div className="flex-1 h-20 inline-flex flex-col justify-start items-start">
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
  );
}

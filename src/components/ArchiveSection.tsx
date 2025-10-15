import Image from "next/image";
import Link from "next/link";

export default function ArchiveSection() {
  return (
    <section className="self-stretch min-h-screen inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5 sticky top-0 z-10">
        <div className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px] whitespace-nowrap">
          ARCHIVE
        </div>
        <div className="w-60 h-6 justify-end text-black text-sm font-[800] font-['Archivo']">
          item description
        </div>
      </div>

      {/* Archive Grid */}
      <div className="self-stretch flex-1 inline-flex justify-center items-center gap-8">
        {/* Frame 1 - Find Your Smile */}
        <Link href="/archive" className="flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
          <div className="relative w-full">
            <Image
              src="/archivesection/archive1.png"
              alt="Find Your Smile"
              width={360}
              height={527}
              className="w-full h-auto object-contain"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
          </div>
          <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
            FIND YOUR SMILE
          </div>
        </Link>

        {/* Frame 2 - Behind The Scenes */}
        <Link href="/archive" className="flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
          <div className="relative w-full">
            <Image
              src="/archivesection/archive1.png"
              alt="Behind The Scenes"
              width={360}
              height={527}
              className="w-full h-auto object-contain"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
          </div>
          <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
            BEHIND THE SCENES
          </div>
        </Link>

        {/* Frame 3 - Events */}
        <Link href="/archive" className="flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
          <div className="relative w-full">
            <Image
              src="/archivesection/archive1.png"
              alt="Events"
              width={360}
              height={527}
              className="w-full h-auto object-contain"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
          </div>
          <div className="self-stretch h-4 justify-start text-black text-base font-[800] font-['Archivo']">
            EVENTS
          </div>
        </Link>
      </div>
    </section>
  );
}
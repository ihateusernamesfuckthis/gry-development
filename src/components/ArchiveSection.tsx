import Image from "next/image";
import Link from "next/link";

export default function ArchiveSection() {
  return (
    <section className="self-stretch min-h-screen inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white flex flex-col lg:inline-flex lg:flex-row justify-start items-start lg:items-end gap-1 lg:gap-3.5 sticky top-0 z-10">
        <div id="archive" className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px]">
          ARCHIVE
        </div>
        <div className="hidden lg:block w-60 h-6 justify-end text-black text-sm font-[800] font-['Archivo']">
          item description
        </div>
      </div>

      {/* Archive Grid - Mobile: Stacked, Desktop: Horizontal */}
      <div className="self-stretch flex-1 flex flex-col lg:inline-flex lg:flex-row justify-center items-center gap-6 lg:gap-8">
        {/* Frame 1 - Find Your Smile */}
        <Link href="/archive" className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
          <div className="relative w-full">
            <Image
              src="/archivesection/find.avif"
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
        <Link href="/archive" className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
          <div className="relative w-full">
            <Image
              src="/archivesection/BTS.avif"
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
        <Link href="/archive" className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
          <div className="relative w-full">
            <Image
              src="/archivesection/events.avif"
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
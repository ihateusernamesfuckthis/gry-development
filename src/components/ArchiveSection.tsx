import Image from "next/image";
import Link from "next/link";

export default function ArchiveSection() {
  return (
    <section className="self-stretch min-h-screen inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white flex flex-col lg:inline-flex lg:flex-row justify-start items-start lg:items-end gap-1 lg:gap-3.5 sticky top-0 z-10">
        {/* Title - Responsive text size */}
        <div id="archive" className="justify-start text-4xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px]">
          ARCHIVE
        </div>
      </div>

      {/* Archive Grid - Mobile: Stacked with larger gap, Desktop: Horizontal */}
      <div className="self-stretch flex-1 pt-6 flex flex-col lg:inline-flex lg:flex-row justify-center items-center gap-12 lg:gap-8">
        {/* Frame 1 - Find Your Smile */}
        <Link href="/archive#find-your-smile" className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
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
          <div className="self-stretch h-4 justify-start text-black text-base font-extrabold font-['Archivo']">
            FIND YOUR SMILE
          </div>
        </Link>

        {/* Frame 2 - Behind The Scenes */}
        <Link href="/archive#behind-the-scenes" className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
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
          <div className="self-stretch h-4 justify-start text-black text-base font-extrabold font-['Archivo']">
            BEHIND THE SCENES
          </div>
        </Link>

        {/* Frame 3 - Events */}
        <Link href="/archive#events" className="w-full lg:flex-1 inline-flex flex-col justify-start items-start gap-2 group cursor-pointer">
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
          <div className="self-stretch h-4 justify-start text-black text-base font-extrabold font-['Archivo']">
            EVENTS
          </div>
        </Link>
      </div>
    </section>
  );
}

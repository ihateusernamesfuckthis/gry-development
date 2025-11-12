import Image from "next/image";

interface ArchiveImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface ArchiveCategorySectionProps {
  title: string;
  images: ArchiveImage[];
  sectionId: string;
}

export default function ArchiveCategorySection({
  title,
  images,
  sectionId,
}: ArchiveCategorySectionProps) {
  return (
    <section
      id={sectionId}
      className="self-stretch flex flex-col justify-start items-start gap-3 pb-12"
    >
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 pb-4 bg-white flex justify-start items-end gap-3.5">
        <div className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px] lg:whitespace-nowrap">
          {title}
        </div>
      </div>

      {/* Image Grid - Mobile: 1 column, Desktop: 3 columns */}
      <div className="self-stretch w-full flex justify-center items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-min">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative w-full group cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.altText || title}
                width={image.width}
                height={image.height}
                className="w-full h-auto object-contain"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
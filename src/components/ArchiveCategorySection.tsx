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
      className="self-stretch min-h-screen inline-flex flex-col justify-start items-start gap-3"
    >
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5 sticky top-0 z-10">
        <div className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px] whitespace-nowrap">
          {title}
        </div>
      </div>

      {/* Image Grid */}
      <div className="self-stretch flex-1 inline-flex justify-center items-center">
        <div className="w-full grid grid-cols-3 gap-8 auto-rows-min">
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
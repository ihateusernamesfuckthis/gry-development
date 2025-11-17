import RingCard from "./RingCard";

export default function RingSection() {
  return (
    <section className="self-stretch inline-flex flex-col justify-start items-start gap-3 lg:gap-6">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white flex flex-col lg:inline-flex lg:flex-row justify-start items-start lg:items-end gap-1 lg:gap-3.5 sticky top-0 z-10">
        {/* RINGS Title - Responsive text size */}
        <div id="rings" className="justify-start text-4xl lg:text-8xl text-black font-black font-['Archivo'] uppercase leading-9 lg:leading-[80px]">
          RINGS
        </div>
        {/* Subtitle - Always visible with responsive sizing */}
        <div className="w-48 lg:w-58 h-auto justify-start lg:justify-end text-black text-sm font-extrabold font-['Archivo']">
          handcrafted, made to order.
        </div>
      </div>

      {/* Ring Grid - Mobile: Stacked vertically, Desktop: Horizontal row */}
      <div className="self-stretch flex flex-col gap-8 lg:inline-flex lg:flex-row lg:justify-end lg:items-start lg:gap-8">
        <RingCard
          name="RING #1"
          material="925 Sterling Silver"
          price="1.400 DKK"
          imageNumber={1}
          handle="ring-1"
        />
        <RingCard
          name="RING #2"
          material="925 Sterling Silver"
          price="1.400 DKK"
          imageNumber={2}
          handle="ring-2"
        />
        <RingCard
          name="RING #3"
          material="925 Sterling Silver"
          price="1.200 DKK"
          imageNumber={3}
          handle="ring-3"
        />
      </div>
    </section>
  );
}

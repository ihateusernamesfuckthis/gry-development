import RingCard from "./RingCard";

export default function RingSection() {
  return (
    <section className="self-stretch inline-flex flex-col justify-start items-start gap-3">
      {/* Section Header */}
      <div className="self-stretch pr-[5px] pt-4 bg-white inline-flex justify-start items-end gap-3.5 sticky top-0 z-10">
        <div className="justify-start text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px]">
          RINGS
        </div>
        <div className="w-58 h-6 justify-end text-black text-sm font-[800] font-['Archivo']">
          handcrafted, made to order.
        </div>
      </div>

      {/* Ring Grid */}
      <div className="self-stretch inline-flex justify-end items-start gap-8">
        <RingCard
          name="RING #1"
          material="925 Sterling Silver"
          price="1.100 DKK"
          imageNumber={1}
          handle="ring-1"
        />
        <RingCard
          name="RING #2"
          material="925 Sterling Silver"
          price="1.100 DKK"
          imageNumber={1}
          handle="ring-2"
        />
        <RingCard
          name="RING #3"
          material="925 Sterling Silver"
          price="1.100 DKK"
          imageNumber={1}
          handle="ring-3"
        />
      </div>
    </section>
  );
}

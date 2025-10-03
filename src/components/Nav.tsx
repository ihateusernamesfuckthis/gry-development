import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-64 h-screen pt-4 sticky top-0 inline-flex flex-col justify-start items-start">
      {/* Logo */}
      <div className="justify-end text-black text-8xl font-[900] font-['Archivo'] uppercase leading-[80px]">
        GRY
      </div>

      {/* Nav Wrapper */}
      <div className="pl-1 flex flex-col justify-between flex-1 h-full">
        {/* Menu */}
        <div className="flex flex-col justify-center items-start gap-1 flex-1">
          <Link href="/grillz" className="w-20 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']">
              GRILLZ
            </div>
          </Link>

          <Link href="/rings" className="w-16 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[800] font-['Archivo']">
              RINGS
            </div>
          </Link>

          <Link href="/archive" className="w-24 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-lg font-[600] font-['Archivo']">
              ARCHIVE
            </div>
          </Link>

          <Link href="/cart" className="w-14 h-5 relative">
            <div className="left-0 top-0 absolute justify-start text-yellow-500 text-lg font-[800] font-['Archivo']">
              CART
            </div>
          </Link>
        </div>

        {/* Socials */}
        <div className="pb-12 flex flex-col justify-end items-start gap-2">
          <Link href="https://tiktok.com" target="_blank" className="w-14 h-3.5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-sm font-[800] font-['Archivo']">
              TIKTOK
            </div>
          </Link>

          <Link href="https://instagram.com" target="_blank" className="w-24 h-3.5 relative">
            <div className="left-0 top-0 absolute justify-start text-black text-sm font-[800] font-['Archivo']">
              INSTAGRAM
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

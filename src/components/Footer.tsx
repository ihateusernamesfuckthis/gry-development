import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-[63px] flex items-end justify-between text-sm text-black font-['Archivo']">
      {/* Left side - Brand */}
    

      {/* Right side - Links */}
      <div className="flex-1 flex items-center justify-end gap-8 text-right">
        <Link href="/contact" className="font-[800]">
          CONTACT
        </Link>
        <Link href="/faq" className="font-[800]">
          FAQ
        </Link>
        <Link href="/terms" className="font-[800]">
          TERMS AND CONDITIONS
        </Link>
      </div>
    </footer>
  );
}

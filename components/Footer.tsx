import Link from "next/link";
import { Scroll } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2B1E16] text-[#F4EBD9] pt-14 pb-10 border-t-2 border-[#B8860B] font-serif">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#8B0000]/40">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Scroll className="w-6 h-6 text-[#B8860B]" />
              <span className="font-bold text-2xl text-[#F4EBD9]">Pick<span className="text-[#8B0000]">Tomes</span></span>
            </div>
            <p className="text-xs text-[#F4EBD9]/70 leading-relaxed max-w-md font-sans">
              Antique digital scriptorium. Preserving classic literature, ancient philosophy, rare manuscripts, and artisanal EPUB tomes.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#B8860B] uppercase tracking-widest mb-3">Scriptorium Vaults</h4>
            <ul className="space-y-1.5 text-xs text-[#F4EBD9]/80">
              <li><Link href="/collections" className="hover:text-[#B8860B]">Tome Collections</Link></li>
              <li><Link href="/genres" className="hover:text-[#B8860B]">Genres</Link></li>
              <li><Link href="/authors" className="hover:text-[#B8860B]">Classical Authors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#B8860B] uppercase tracking-widest mb-3">Scriptorium Support</h4>
            <ul className="space-y-1.5 text-xs text-[#B8860B]">
              <li><Link href="/privacy" className="hover:text-[#B8860B]">Privacy Codex</Link></li>
              <li><Link href="/terms" className="hover:text-[#B8860B]">Terms of Scriptorium</Link></li>
              <li><Link href="/contact" className="hover:text-[#B8860B]">Contact Scribe</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-[#B8860B]">
          © {new Date().getFullYear()} PickTomes Scriptorium. All rights reserved. Ancient Wisdom Preserved.
        </div>
      </div>
    </footer>
  );
}

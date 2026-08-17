import Link from "next/link";
import { ArrowRight, Scroll, BookOpen, Feather } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 bg-[#F4EBD9] text-[#2B1E16] font-serif">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Illuminated Scriptorium Parchment Box Container */}
        <div className="bg-[#E6D7BC] rounded-3xl p-8 sm:p-14 border-4 border-[#8B0000]/40 shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Hanging Crimson Ribbon Marker */}
          <div className="absolute top-0 right-12 w-6 h-24 bg-[#8B0000] border-x border-b border-[#B8860B] z-20 shadow-md" />

          {/* Left Column: Illuminated Drop-Cap Manuscript Headline */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8B0000] text-[#F4EBD9] text-xs font-bold rounded-full border border-[#B8860B] uppercase tracking-widest font-manrope">
              <Scroll className="w-4 h-4 text-[#B8860B]" /> Ancient Scriptorium Codex & Rare Manuscripts
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] text-[#2B1E16]">
              Preserving The <br />
              <span className="text-[#8B0000] italic font-normal">Wisdom of Ancient Tomes</span>
            </h1>

            <p className="text-sm sm:text-base text-[#2B1E16]/80 leading-relaxed max-w-xl font-manrope">
              <span className="float-left text-5xl font-bold text-[#8B0000] leading-none pr-3 pt-1 font-serif">W</span>
              elcome to PickTomes, an antique digital scriptorium dedicated to restoring classical literature, gothic manuscripts, and timeless philosophical tomes in DRM-free EPUB codex formats.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-manrope">
              <Link 
                href="/collections" 
                className="bg-[#8B0000] hover:bg-[#2B1E16] text-[#F4EBD9] px-9 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all border border-[#B8860B] shadow-lg flex items-center gap-2.5 hover:scale-105"
              >
                <span>Unseal Scriptorium Vaults</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: Aged Leather Tome Display */}
          <div className="lg:col-span-5 flex justify-center py-4">
            <div className="w-64 aspect-[9/14] bg-[#2B1E16] text-[#F4EBD9] rounded-2xl border-4 border-[#B8860B] shadow-2xl p-6 flex flex-col justify-between text-center relative">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#B8860B] bg-[#B8860B]/20 px-3 py-1 rounded-full border border-[#B8860B]/40 w-max mx-auto font-manrope">
                CODEX VOL. I
              </span>

              <div className="my-auto space-y-3 py-4">
                <Scroll className="w-12 h-12 mx-auto text-[#B8860B]" />
                <h3 className="text-2xl font-bold text-white">Classical Tomes</h3>
                <p className="text-xs text-[#F4EBD9]/70 font-manrope">Restored ancient wisdom & classical treatises.</p>
              </div>

              <div className="pt-3 border-t border-[#B8860B]/30 text-xs font-bold text-[#B8860B] uppercase tracking-widest font-manrope">
                Preserved Forever
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

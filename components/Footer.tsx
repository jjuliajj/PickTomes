import Link from "next/link";
import { BookOpen, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 font-sans border-t-2 border-amber-500 pt-16 pb-12">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-[#0F172A] p-2 flex items-center justify-center font-black">
                <BookOpen className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-cormorant">
                PICKTOMES
              </span>
            </Link>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Premier digital literature platform & scriptorium vault providing verified 100% DRM-free EPUB e-books.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 text-[10px] font-bold rounded-full border border-amber-500/30 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> EPUB 3.0 Standard
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cormorant text-sm">
              Scriptorium Directory
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home Scriptorium</Link></li>
              <li><Link href="/collections" className="hover:text-amber-400 transition-colors">Complete Catalogue</Link></li>
              <li><Link href="/genres" className="hover:text-amber-400 transition-colors">Disciplines & Topics</Link></li>
              <li><Link href="/authors" className="hover:text-amber-400 transition-colors">Visionary Scholars</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cormorant text-sm">
              Reader Desk
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About PickTomes</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Curators</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">DRM & Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Col 4: Guaranteed EPUB */}
          <div className="space-y-3 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-cormorant text-sm">
              Instant Cloud Delivery
            </h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Every purchase grants an unrestricted, permanent EPUB file compatible with Kindle, Apple Books, Kobo, and Android e-readers.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div>&copy; {new Date().getFullYear()} PickTomes Digital Vault Inc. All rights reserved.</div>
          <div className="flex items-center gap-1 text-slate-400">
            Crafted for discerning readers with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}

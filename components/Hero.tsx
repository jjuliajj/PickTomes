import Link from "next/link";
import { Flame, ArrowRight, ShieldCheck, Tag, Gift, Zap, Percent, Sparkles, Star, ShoppingBag, BookOpen } from "lucide-react";

export default function Hero() {
  const flashSaleBanners = [
    { title: "Literature & Classics Up To 50% Off", code: "VAULT50", bg: "bg-amber-50 text-amber-900 border-amber-200" },
    { title: "Personal Growth & Philosophy", code: "SKILL30", bg: "bg-rose-50 text-rose-900 border-rose-200" },
  ];

  return (
    <section className="pt-36 pb-14 bg-[#FBF9F5] font-sans relative overflow-hidden">
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl relative z-10">
        
        {/* Magazine Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Magazine Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100/80 text-amber-900 text-xs font-bold rounded-full border border-amber-200/80 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" /> ANCIENT WISDOM & DIGITAL VAULT
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] leading-[1.08] font-cormorant tracking-tight">
              THE UNIVERSAL <br />
              <span className="text-amber-700 italic font-semibold">
                Rare Literature Hub
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl font-medium">
              Explore thousands of verified monographs, antique philosophy codices, classic fiction, and self-mastery archives. Download verified 100% DRM-free EPUB e-books instantly to any device.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-[#0F172A] hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2 group hover:scale-105"
              >
                <span>Explore Scriptorium</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/genres" 
                className="bg-white hover:bg-slate-100 text-[#0F172A] px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-slate-300 flex items-center gap-2 shadow-xs"
              >
                <Tag className="w-4 h-4 text-amber-700" />
                <span>Explore Disciplines</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% DRM-Free EPUB 3.0
              </span>
              <span className="flex items-center gap-1.5 text-slate-800">
                <Zap className="w-4 h-4 text-amber-600" /> Instant Cloud Download
              </span>
            </div>
          </div>

          {/* Right Column: Bestseller Spotlight Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xl space-y-5 relative overflow-hidden group hover:shadow-3xl transition-all">
              
              {/* Top Badge */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  ★ FEATURED SPOTLIGHT
                </span>
                <span className="text-xs font-bold text-slate-500">Vol. 01 Scriptorium</span>
              </div>

              {/* Spotlight Book Image Banner */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 relative shadow-inner group-hover:scale-[1.01] transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" 
                  alt="Featured Book Spotlight" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">Philosophy & Monograph</span>
                  <h3 className="text-2xl font-black font-cormorant leading-snug">The Midnight Library & Rare Meditations</h3>
                </div>
              </div>

              {/* Active Coupons Grid */}
              <div className="space-y-2 pt-1">
                {flashSaleBanners.map((banner, idx) => (
                  <div key={idx} className={`${banner.bg} border p-3 rounded-xl flex items-center justify-between shadow-xs`}>
                    <div>
                      <div className="text-xs font-black uppercase">{banner.title}</div>
                      <div className="text-[10px] font-bold mt-0.5 opacity-80">Use Code: <span className="bg-[#0F172A] text-white px-1.5 py-0.5 rounded font-mono">{banner.code}</span></div>
                    </div>
                    <Percent className="w-5 h-5 text-amber-700 flex-shrink-0" />
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs font-bold text-slate-600">
                <span>⚡ Instant access guaranteed upon checkout</span>
                <Link href="/collections" className="text-amber-700 hover:underline">Explore All &rarr;</Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}



import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, ShieldCheck, Award, Sparkles, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PickTomes | Premier Digital Book Vault",
  description: "Learn about PickTomes mission, verified publishing standards, and digital reading platform.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#090D16] font-sans text-slate-100">
      <Navbar />

      <section className="pt-36 pb-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl space-y-16">
          
          <header className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" /> PREMIER DIGITAL LITERATURE HUB
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white font-cormorant">
              About PickTomes Vault
            </h1>
            <p className="text-base text-slate-300 font-medium leading-relaxed">
              PickTomes is a premier digital literature platform dedicated to providing verified monographs, non-fiction classics, philosophy essays, and self-help ebooks.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-4 text-left backdrop-blur-xl hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-white font-cormorant">100% DRM-Free EPUB</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                All books are formatted in verified EPUB 3.0 standards compatible with any e-reader or digital tablet.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-4 text-left backdrop-blur-xl hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <BookOpen className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-white font-cormorant">Instant Cloud Download</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Instant delivery right after checkout so you can begin reading your favorite titles immediately.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-4 text-left backdrop-blur-xl hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Award className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-white font-cormorant">Exclusive Deals</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Daily promotional events offering up to 50% discount vouchers on bestselling library volumes.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-indigo-950/40 border border-amber-500/30 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
            <div className="space-y-2 max-w-xl text-left">
              <h2 className="text-3xl font-black text-white font-cormorant">Explore Our Digital Library</h2>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Browse over 40+ curated titles and enjoy premier reading at your fingertips.
              </p>
            </div>
            <Link
              href="/collections"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2 flex-shrink-0"
            >
              <span>Explore Vault</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

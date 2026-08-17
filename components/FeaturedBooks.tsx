import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-14 bg-[#FBF9F5] font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2 border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-700" /> BESTSELLING TOMES & MANUSCRIPTS
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] font-cormorant">
              Featured & <span className="text-amber-700 italic">Trending Manuscripts</span>
            </h2>
          </div>

          <Link
            href="/collections"
            className="text-xs font-black text-white hover:bg-amber-700 flex items-center gap-2 uppercase tracking-wider transition-all bg-[#0F172A] px-5 py-2.5 rounded-full shadow-md"
          >
            <span>View Complete Vault ({books.length} Books)</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}



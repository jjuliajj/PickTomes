import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Flame, ArrowRight, Sparkles } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-12 bg-[#F0F2F5]">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C92127]/10 text-[#C92127] text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 fill-[#C92127]" /> SÁCH BÁN CHẠY NHẤT FAHASA
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              Xu Hướng & <span className="text-[#C92127]">Được Yêu Thích</span>
            </h2>
          </div>

          <Link
            href="/collections"
            className="text-xs font-bold text-[#C92127] hover:text-[#A3181C] flex items-center gap-2 uppercase tracking-wider transition-colors bg-rose-50 px-4 py-2 rounded-full border border-rose-200"
          >
            <span>Xem Tất Cả ({books.length} Sách)</span>
            <ArrowRight className="w-4 h-4" />
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

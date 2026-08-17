import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-16 bg-[#F8FAFC] text-[#334155] font-manrope">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#334155]/20 pb-6 font-serif">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#334155] text-[#F8FAFC] text-xs font-bold rounded-full uppercase tracking-widest mb-3 font-sans">
              <Layers className="w-4 h-4 text-[#F8FAFC]" /> Horizontal Spatial Scroll Shelf
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#334155]">
              Interactive <span className="italic font-normal">Spatial Carousel</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold font-sans text-[#334155] hover:underline flex items-center gap-2 uppercase tracking-wider transition-colors"
          >
            <span>Explore Spatial Vault ({books.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Spatial Scroll Shelf (`overflow-x-auto`) */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#334155]/30">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { Book } from "@/lib/api";
import { 
  Flame, 
  Layers, 
  Bookmark, 
  ArrowRight, 
  LayoutGrid, 
  ListFilter, 
  BookOpen,
  Filter,
  Check,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

interface CategoryExplorerProps {
  initialBooks: Book[];
}

export default function CategoryExplorer({ initialBooks }: CategoryExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialBooks.map(b => b.category).filter(Boolean)));
    return ["All", ...unique];
  }, [initialBooks]);

  const categoryStats = useMemo(() => {
    const map: Record<string, { count: number; sampleBooks: Book[] }> = {};
    initialBooks.forEach((book) => {
      const cat = book.category || "General";
      if (!map[cat]) {
        map[cat] = { count: 0, sampleBooks: [] };
      }
      map[cat].count += 1;
      if (map[cat].sampleBooks.length < 3) {
        map[cat].sampleBooks.push(book);
      }
    });
    return map;
  }, [initialBooks]);

  const sortedAndFilteredBooks = useMemo(() => {
    let result = selectedCategory === "All" 
      ? [...initialBooks] 
      : initialBooks.filter(b => b.category === selectedCategory);

    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const pA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const pB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const pA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const pB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return pB - pA;
      });
    }
    return result;
  }, [initialBooks, selectedCategory, sortBy]);

  return (
    <div className="space-y-10 font-sans">
      
      {/* 1. Header Hero Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/90 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-700" /> CATEGORY EXPLORER PORTAL
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] font-cormorant leading-tight">
            Explore by <span className="text-amber-700 italic">Category & Topic</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Browse our curated digital literature collection organized by discipline, research movement, and literary themes.
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-[#0F172A] text-white px-6 py-5 rounded-2xl shadow-xl flex items-center gap-4 flex-shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-[#0F172A] flex items-center justify-center font-black shadow-sm">
            <Layers className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-3xl font-black text-white font-cormorant">{categories.length - 1}</div>
            <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest">
              Categories ({initialBooks.length} Books)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Category Tiles Mosaic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categoryStats).map(([catName, data]) => {
          const isSelected = selectedCategory === catName;
          return (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName)}
              className={`text-left rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group space-y-6 relative overflow-hidden ${
                isSelected
                  ? "bg-[#0F172A] text-white border-[#0F172A] shadow-2xl scale-[1.02]"
                  : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 hover:border-amber-500/60 hover:shadow-xl"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-amber-500 text-[#0F172A]" : "bg-amber-50 text-amber-800 group-hover:bg-amber-600 group-hover:text-white"
                  }`}>
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isSelected ? "bg-white/10 text-amber-300 border-white/20" : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {data.count} {data.count === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>

                <div>
                  <h2 className={`text-2xl font-black font-cormorant transition-colors ${isSelected ? "text-amber-300" : "text-[#0F172A] group-hover:text-amber-700"}`}>
                    {catName}
                  </h2>
                  <p className={`text-xs font-medium mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    Curated {catName.toLowerCase()} titles & foundational archives.
                  </p>
                </div>
              </div>

              {/* Fan-Out Book Cover Stack */}
              <div className="flex items-center justify-between pt-2 border-t border-current/10">
                <div className="flex -space-x-3 overflow-hidden py-1">
                  {data.sampleBooks.map((book, idx) => (
                    <div
                      key={book.id}
                      className="w-10 aspect-[3/4] rounded-md overflow-hidden border-2 border-white shadow-sm flex-shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ zIndex: 10 - idx }}
                    >
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <BookOpen className="w-3 h-3 text-slate-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <span className={`text-xs font-extrabold flex items-center gap-1 uppercase tracking-wider ${
                  isSelected ? "text-amber-300" : "text-amber-700 group-hover:text-amber-800"
                }`}>
                  <span>{isSelected ? "Active View" : "Explore"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Multi-Filter & Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-amber-700" /> Filter:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  active
                    ? "bg-[#0F172A] text-white shadow-md font-extrabold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Sort & View Mode Controls */}
        <div className="flex flex-wrap items-center gap-3 flex-shrink-0 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Bestselling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <span className="text-xs text-slate-500 font-bold hidden sm:inline">
            Showing <strong className="text-amber-700">{sortedAndFilteredBooks.length}</strong> items
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-[#0F172A] shadow-2xs font-bold" : "text-slate-400 hover:text-slate-700"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-[#0F172A] shadow-2xs font-bold" : "text-slate-400 hover:text-slate-700"}`}
              title="List View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 4. Filtered & Sorted Product Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              image={book.cover_url}
              category={book.category}
              description={book.description}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAndFilteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-amber-500/60 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-5 min-w-0">
                <Link href={`/products/${book.id}`} className="w-16 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 block">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <BookOpen className="w-5 h-5 text-[#0F172A]" />
                    </div>
                  )}
                </Link>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-amber-900 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {book.category}
                    </span>
                  </div>
                  <Link href={`/products/${book.id}`}>
                    <h3 className="font-bold text-xl text-[#0F172A] font-cormorant group-hover:text-amber-700 transition-colors truncate">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 italic">by {book.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end border-slate-100">
                <span className="font-black text-xl text-[#0F172A]">{book.price || "$1.99"}</span>
                <Link
                  href={`/products/${book.id}`}
                  className="bg-[#0F172A] hover:bg-amber-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}



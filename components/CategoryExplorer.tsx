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
  Tag
} from "lucide-react";

interface CategoryExplorerProps {
  initialBooks: Book[];
}

export default function CategoryExplorer({ initialBooks }: CategoryExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất Cả");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialBooks.map(b => b.category).filter(Boolean)));
    return ["Tất Cả", ...unique];
  }, [initialBooks]);

  const categoryStats = useMemo(() => {
    const map: Record<string, { count: number; sampleBooks: Book[] }> = {};
    initialBooks.forEach((book) => {
      const cat = book.category || "Khác";
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

  const filteredBooks = useMemo(() => {
    if (selectedCategory === "Tất Cả") return initialBooks;
    return initialBooks.filter(b => b.category === selectedCategory);
  }, [initialBooks, selectedCategory]);

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-rose-50 text-[#C92127] text-xs font-bold rounded-full border border-rose-200 uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-[#C92127]" /> CỔNG DANH MỤC NỔI BẬT FAHASA
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">
            Khám Phá Theo <span className="text-[#C92127]">Thể Loại & Chủ Đề</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
            Tuyển chọn các tác phẩm văn học, kinh tế, triết học và kỹ năng sống chính hãng hàng đầu từ Fahasa Hub.
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-[#C92127] text-white px-6 py-5 rounded-2xl shadow-lg flex items-center gap-4 flex-shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white text-[#C92127] flex items-center justify-center font-black shadow-sm">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{categories.length - 1}</div>
            <div className="text-[10px] font-extrabold text-white/80 uppercase tracking-widest">
              Thể Loại ({initialBooks.length} Sách)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categoryStats).map(([catName, data]) => {
          const isSelected = selectedCategory === catName;
          return (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName)}
              className={`text-left rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group space-y-6 relative overflow-hidden ${
                isSelected
                  ? "bg-[#C92127] text-white border-[#C92127] shadow-xl scale-[1.02]"
                  : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-[#C92127] hover:shadow-md"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-white text-[#C92127]" : "bg-rose-50 text-[#C92127] group-hover:bg-[#C92127] group-hover:text-white"
                  }`}>
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isSelected ? "bg-white/20 text-white border-white/30" : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {data.count} Tác phẩm
                  </span>
                </div>

                <div>
                  <h2 className={`text-2xl font-black transition-colors ${isSelected ? "text-white" : "text-slate-800 group-hover:text-[#C92127]"}`}>
                    {catName}
                  </h2>
                  <p className={`text-xs font-medium mt-1 ${isSelected ? "text-white/80" : "text-slate-500"}`}>
                    Tuyển chọn sách {catName.toLowerCase()} bán chạy & mới phát hành.
                  </p>
                </div>
              </div>

              {/* Fan-Out Book Covers */}
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
                  isSelected ? "text-amber-300" : "text-[#C92127] group-hover:text-[#C92127]"
                }`}>
                  <span>{isSelected ? "Đang chọn" : "Khám phá"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Filter Pills Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#C92127]" /> Lọc:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  active
                    ? "bg-[#C92127] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-white" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
          <span className="text-xs text-slate-500 font-bold">
            Hiển thị <strong className="text-[#C92127]">{filteredBooks.length}</strong> cuốn
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-[#C92127] shadow-2xs" : "text-slate-400 hover:text-slate-700"}`}
              title="Xem Lưới"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-[#C92127] shadow-2xs" : "text-slate-400 hover:text-slate-700"}`}
              title="Xem Danh Sách"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Product Grid / List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#C92127] hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-5 min-w-0">
                <Link href={`/products/${book.id}`} className="w-16 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 block">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  )}
                </Link>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-[#C92127] uppercase bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {book.category}
                    </span>
                  </div>
                  <Link href={`/products/${book.id}`}>
                    <h3 className="font-bold text-base text-slate-800 group-hover:text-[#C92127] transition-colors truncate">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 italic">bởi {book.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                <span className="font-black text-lg text-[#C92127]">{book.price || "$1.99"}</span>
                <Link
                  href={`/products/${book.id}`}
                  className="bg-[#C92127] hover:bg-[#A3181C] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>Chi Tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Book } from "@/lib/api";
import { getAuthorAvatar } from "@/lib/authorAvatar";
import { useCart } from "@/lib/CartContext";
import { 
  Users, 
  Award, 
  Search, 
  BookOpen, 
  ArrowRight, 
  X, 
  Plus, 
  Check, 
  ShieldCheck, 
  ShoppingCart,
  Star
} from "lucide-react";

interface AuthorGroup {
  name: string;
  avatar: string;
  category: string;
  count: number;
  books: Book[];
}

interface ScholarsGalleryProps {
  initialBooks: Book[];
}

export default function ScholarsGallery({ initialBooks }: ScholarsGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorGroup | null>(null);
  const [addedBookId, setAddedBookId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const authorData: AuthorGroup[] = useMemo(() => {
    const authorNames = Array.from(new Set(initialBooks.map((b) => b.author).filter(Boolean)));
    return authorNames.map((name) => {
      const authorBooks = initialBooks.filter((b) => b.author === name);
      const categories = authorBooks.map((b) => b.category).filter(Boolean);
      const mainCategory = categories[0] || "Tác giả nổi bật";
      return {
        name,
        avatar: getAuthorAvatar(name),
        category: mainCategory,
        count: authorBooks.length,
        books: authorBooks,
      };
    });
  }, [initialBooks]);

  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authorData;
    const query = searchQuery.toLowerCase();
    return authorData.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.books.some((b) => b.title.toLowerCase().includes(query))
    );
  }, [authorData, searchQuery]);

  const handleQuickAdd = (bookId: string) => {
    addToCart(bookId, 1);
    setAddedBookId(bookId);
    setTimeout(() => setAddedBookId(null), 1500);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-rose-50 text-[#C92127] text-xs font-bold rounded-full border border-rose-200 uppercase tracking-wider">
            <Users className="w-4 h-4" /> DANH MỤC TÁC GIẢ FAHASA
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">
            Tác Giả & <span className="text-[#C92127]">Nhà Nghiên Cứu</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
            Gặp gỡ các tác giả nổi tiếng, các nhà tư tưởng và nhà nghiên cứu xuất sắc trên hệ thống Fahasa Hub.
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-[#C92127] text-white px-6 py-5 rounded-2xl shadow-lg flex items-center gap-4 flex-shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white text-[#C92127] flex items-center justify-center font-black shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{authorData.length}</div>
            <div className="text-[10px] font-extrabold text-white/80 uppercase tracking-widest">
              Tác Giả ({initialBooks.length} Sách)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tác giả, thể loại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-slate-100 text-slate-800 rounded-full border border-slate-300 focus:border-[#C92127] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-semibold"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs font-bold text-slate-500 self-end md:self-auto">
          Hiển thị <strong className="text-[#C92127]">{filteredAuthors.length}</strong> tác giả
        </div>
      </div>

      {/* 3. Author Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAuthors.map((author) => (
          <div
            key={author.name}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#C92127] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-5">
              {/* Author Portrait Frame */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border-2 border-rose-100 shadow-sm bg-slate-100">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#C92127] px-3 py-1 rounded-full shadow-xs">
                    {author.category}
                  </span>
                  <span className="text-xs font-extrabold text-[#C92127] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                    {author.count} Sách
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div>
                <h2 className="text-2xl font-black text-slate-800 group-hover:text-[#C92127] transition-colors">
                  {author.name}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  Tác giả nổi tiếng trong lĩnh vực {author.category.toLowerCase()}.
                </p>
              </div>

              {/* Mini Bookshelf Preview */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  Tác phẩm xuất bản ({author.count})
                </span>
                
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {author.books.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 hover:bg-rose-50/50 transition-colors group/book border border-slate-200/60"
                    >
                      <Link href={`/products/${book.id}`} className="w-8 aspect-[3/4] bg-slate-200 rounded overflow-hidden flex-shrink-0 border border-slate-300 block">
                        {book.cover_url ? (
                          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <BookOpen className="w-3 h-3" />
                          </div>
                        )}
                      </Link>

                      <div className="flex-grow min-w-0">
                        <Link href={`/products/${book.id}`} className="text-xs font-bold text-slate-800 truncate block group-hover/book:text-[#C92127] transition-colors">
                          {book.title}
                        </Link>
                        <div className="text-[10px] font-extrabold text-[#C92127]">
                          {book.price || "$1.99"}
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(book.id)}
                        className={`p-1.5 rounded-full transition-all flex-shrink-0 ${
                          addedBookId === book.id 
                            ? "bg-emerald-600 text-white" 
                            : "bg-[#C92127] text-white hover:bg-[#A3181C]"
                        }`}
                        title="Thêm vào giỏ"
                      >
                        {addedBookId === book.id ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Trigger */}
            <button
              onClick={() => setSelectedAuthor(author)}
              className="w-full py-3 bg-[#C92127] text-white hover:bg-[#A3181C] transition-colors rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Xem Thư Mục Sách</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* 4. Bibliography Slide-over Drawer */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="bg-[#F0F2F5] w-full max-w-xl h-full shadow-2xl overflow-y-auto p-6 md:p-8 flex flex-col justify-between space-y-6 relative border-l border-slate-200 animate-in slide-in-from-right duration-300 font-sans">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-[#C92127] uppercase tracking-wider flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Tác Giả Bản Quyền Fahasa
                </span>
                <button
                  onClick={() => setSelectedAuthor(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C92127] shadow-md">
                  <img src={selectedAuthor.avatar} alt={selectedAuthor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">
                    {selectedAuthor.name}
                  </h2>
                  <div className="text-xs font-semibold text-slate-500">
                    Lĩnh vực chính: <strong className="text-[#C92127]">{selectedAuthor.category}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 border-b border-slate-200 pb-2">
                Tất cả tác phẩm ({selectedAuthor.count})
              </h3>

              <div className="space-y-4">
                {selectedAuthor.books.map((book) => (
                  <div key={book.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-start gap-4">
                    <Link href={`/products/${book.id}`} className="w-16 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 block">
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <BookOpen className="w-4 h-4" />
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1">
                      <Link href={`/products/${book.id}`} className="font-bold text-base text-slate-800 hover:text-[#C92127] transition-colors block">
                        {book.title}
                      </Link>
                      {book.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {book.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-black text-base text-[#C92127]">{book.price || "$1.99"}</span>
                        <button
                          onClick={() => handleQuickAdd(book.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            addedBookId === book.id ? "bg-emerald-600 text-white" : "bg-[#C92127] text-white hover:bg-[#A3181C]"
                          }`}
                        >
                          {addedBookId === book.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                          <span>{addedBookId === book.id ? "Đã thêm" : "Thêm vào giỏ"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedAuthor(null)}
                className="w-full py-3 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#C92127] transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

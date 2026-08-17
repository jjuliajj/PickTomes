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
  Star,
  Sparkles
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
      const mainCategory = categories[0] || "Featured Scholar";
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
    <div className="space-y-10 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/90 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-50 text-amber-900 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-wider">
            <Users className="w-4 h-4 text-amber-700" /> AUTHORS & SCHOLARS HALL OF FAME
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] font-cormorant leading-tight">
            Visionary Authors & <span className="text-amber-700 italic">Thinkers</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
            Meet the brilliant minds, essayists, and researchers shaping modern literature and critical thought in our digital vault.
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-[#0F172A] text-white px-6 py-5 rounded-2xl shadow-xl flex items-center gap-4 flex-shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-[#0F172A] flex items-center justify-center font-black shadow-sm">
            <Award className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-3xl font-black text-white font-cormorant">{authorData.length}</div>
            <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest">
              Authors ({initialBooks.length} Books)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search scholars, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-slate-100 text-slate-800 rounded-full border border-slate-200 focus:border-amber-600 focus:outline-none transition-all placeholder:text-slate-400 font-semibold"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs font-bold text-slate-500 self-end md:self-auto">
          Showing <strong className="text-amber-700">{filteredAuthors.length}</strong> scholars
        </div>
      </div>

      {/* 3. Magazine Split-Pane Author Showcase Cards */}
      <div className="space-y-8">
        {filteredAuthors.map((author) => (
          <div
            key={author.name}
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-amber-500/60 transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center group relative overflow-hidden"
          >
            {/* Left Pane: Author Bio & Avatar */}
            <div className="lg:col-span-5 space-y-4 text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-600 shadow-md flex-shrink-0 relative">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-amber-200">
                    {author.category}
                  </span>
                  <h2 className="text-2xl font-black text-[#0F172A] font-cormorant group-hover:text-amber-700 transition-colors leading-tight">
                    {author.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>4.9 Rating</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{author.count} Works in Library</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Featured author specializing in {author.category.toLowerCase()} and foundational monographs.
              </p>

              <button
                onClick={() => setSelectedAuthor(author)}
                className="w-full py-3 bg-[#0F172A] text-white hover:bg-amber-700 transition-colors rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Inspect Complete Bibliography ({author.count})</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>

            {/* Right Pane: Horizontal Book Showcase Shelf */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Featured Titles Shelf
                </span>
                <span className="text-[10px] font-bold text-amber-900 uppercase bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  Instant EPUB
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {author.books.slice(0, 3).map((book) => (
                  <div
                    key={book.id}
                    className="bg-slate-50 rounded-2xl p-3 border border-slate-200/90 hover:border-amber-500/60 hover:bg-white transition-all group/book flex flex-col justify-between"
                  >
                    <Link href={`/products/${book.id}`} className="w-full aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden mb-2.5 block border border-slate-200">
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover/book:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <BookOpen className="w-5 h-5 text-[#0F172A]" />
                        </div>
                      )}
                    </Link>

                    <div className="space-y-1">
                      <Link href={`/products/${book.id}`} className="text-xs font-bold text-[#0F172A] font-cormorant text-sm line-clamp-1 group-hover/book:text-amber-700 transition-colors block">
                        {book.title}
                      </Link>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-black text-[#0F172A]">{book.price || "$1.99"}</span>
                        <button
                          onClick={() => handleQuickAdd(book.id)}
                          className={`p-1.5 rounded-lg transition-all ${
                            addedBookId === book.id 
                              ? "bg-emerald-600 text-white" 
                              : "bg-[#0F172A] text-white hover:bg-amber-600"
                          }`}
                          title="Add to Cart"
                        >
                          {addedBookId === book.id ? <Check className="w-3 h-3 stroke-[3]" /> : <Plus className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 4. Bibliography Slide-over Drawer */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="bg-[#FBF9F5] w-full max-w-xl h-full shadow-2xl overflow-y-auto p-6 md:p-8 flex flex-col justify-between space-y-6 relative border-l border-slate-200 animate-in slide-in-from-right duration-300 font-sans">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 bg-amber-100 px-2.5 py-1 rounded border border-amber-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> PickTomes Verified Scholar
                </span>
                <button
                  onClick={() => setSelectedAuthor(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-600 shadow-md">
                  <img src={selectedAuthor.avatar} alt={selectedAuthor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#0F172A] font-cormorant">
                    {selectedAuthor.name}
                  </h2>
                  <div className="text-xs font-semibold text-slate-500">
                    Primary Field: <strong className="text-amber-700">{selectedAuthor.category}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 border-b border-slate-200 pb-2">
                All Published Works ({selectedAuthor.count})
              </h3>

              <div className="space-y-4">
                {selectedAuthor.books.map((book) => (
                  <div key={book.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-start gap-4">
                    <Link href={`/products/${book.id}`} className="w-16 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 block">
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <BookOpen className="w-4 h-4 text-[#0F172A]" />
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1">
                      <Link href={`/products/${book.id}`} className="font-bold text-lg text-[#0F172A] font-cormorant hover:text-amber-700 transition-colors block">
                        {book.title}
                      </Link>
                      {book.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {book.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-black text-base text-[#0F172A]">{book.price || "$1.99"}</span>
                        <button
                          onClick={() => handleQuickAdd(book.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                            addedBookId === book.id ? "bg-emerald-600 text-white" : "bg-[#0F172A] text-white hover:bg-amber-700"
                          }`}
                        >
                          {addedBookId === book.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                          <span>{addedBookId === book.id ? "Added" : "Add to Cart"}</span>
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
                className="w-full py-3 bg-[#0F172A] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}



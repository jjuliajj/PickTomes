"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingCart, BookOpen, Flame, Tag } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const navItems = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "DANH MỤC SÁCH", href: "/collections" },
    { label: "THỂ LOẠI", href: "/genres" },
    { label: "TÁC GIẢ NỔI BẬT", href: "/authors" },
    { label: "GIỚI THIỆU", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all font-sans">
      
      {/* Top Banner Ticker (Fahasa Red Style) */}
      <div className="bg-[#C92127] text-white text-[11px] font-bold py-1.5 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>🔥 SIÊU ƯU ĐÃI FAHASA - GIẢM ĐẾN 50% TOÀN BỘ SÁCH EPUB DIGITAL!</span>
        <span className="hidden sm:inline bg-amber-300 text-[#C92127] text-[9px] px-2 py-0.5 rounded font-extrabold ml-2">HOT SALE</span>
      </div>

      <nav
        className={`transition-all duration-300 px-4 sm:px-8 md:px-12 py-3 flex justify-between items-center ${
          isScrolled || isMobileMenuOpen ? "bg-white shadow-md border-b border-slate-200" : "bg-white/95 backdrop-blur-md border-b border-slate-200/80"
        }`}
      >
        {/* Brand Logo - Fahasa Red Style */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#C92127] text-white p-2 flex items-center justify-center shadow-md group-hover:bg-[#A3181C] transition-colors">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#C92127] leading-none uppercase">
              PickTomes <span className="text-slate-800 text-xs font-bold block sm:inline font-sans">| FAHASA HUB</span>
            </span>
            <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">Nhà Sách Trực Tuyến Hàng Đầu</span>
          </div>
        </Link>

        {/* Live Search Bar with Red Search Button */}
        <div className="relative hidden lg:block w-80 xl:w-96" ref={searchRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm sách, tác giả, thể loại..."
              value={searchQuery}
              onFocus={handleSearchFocus}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 text-xs bg-slate-100 text-slate-800 rounded-full border border-slate-300 focus:border-[#C92127] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 font-semibold"
            />
            {searchQuery ? (
              <button onClick={() => setSearchQuery("")} className="absolute right-10 p-1 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button className="absolute right-1 w-8 h-8 rounded-full bg-[#C92127] hover:bg-[#A3181C] text-white flex items-center justify-center transition-colors shadow-2xs">
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Live Search Results */}
          {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 font-sans">
              {isLoadingBooks ? (
                <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#C92127]" /> Đang tìm kiếm kho sách...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C92127] border-b border-slate-100">
                    Kết quả tìm kiếm ({searchResults.length})
                  </div>
                  {searchResults.map((book) => (
                    <Link
                      key={book.id}
                      href={`/products/${book.id}`}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-11 bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
                        {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate group-hover:text-[#C92127]">
                          {book.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">bởi {book.author}</div>
                      </div>
                      <span className="text-xs font-bold text-[#C92127] whitespace-nowrap">{book.price || "$1.99"}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">Không tìm thấy sách phù hợp.</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Items & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-[#C92127] transition-colors py-1 ${
                  pathname === item.href ? "text-[#C92127] font-extrabold border-b-2 border-[#C92127]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/cart"
            className="bg-[#C92127] hover:bg-[#A3181C] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-md hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Giỏ Hàng</span>
            {isMounted && (
              <span className="bg-white text-[#C92127] text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                ${cartTotal.toFixed(2)} ({cartCount})
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
    </header>
  );
}

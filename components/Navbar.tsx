"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingCart, BookOpen, Flame, Sparkles } from "lucide-react";

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
    { label: "HOME", href: "/" },
    { label: "CATALOGUE", href: "/collections" },
    { label: "CATEGORIES", href: "/genres" },
    { label: "AUTHORS", href: "/authors" },
    { label: "ABOUT US", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all font-sans">
      
      {/* Top Banner Ticker */}
      <div className="bg-[#0F172A] text-amber-300 text-[11px] font-bold py-1.5 px-4 text-center border-b border-amber-500/20 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="tracking-wide">🔥 EXCLUSIVE DIGITAL VAULT RELEASE — UP TO 50% OFF ALL EPUB VOLUMES!</span>
        <span className="hidden sm:inline bg-amber-500 text-[#0F172A] text-[9px] px-2 py-0.5 rounded font-black ml-2 uppercase tracking-widest">LIMITED EVENT</span>
      </div>

      <nav
        className={`transition-all duration-300 px-4 sm:px-8 md:px-12 py-3.5 flex justify-between items-center ${
          isScrolled || isMobileMenuOpen 
            ? "bg-white/98 shadow-md border-b border-slate-200" 
            : "bg-white/90 backdrop-blur-md border-b border-slate-200/80"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-amber-400 p-2 flex items-center justify-center shadow-md group-hover:bg-amber-600 group-hover:text-white transition-all">
            <BookOpen className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] leading-none uppercase font-cormorant flex items-center gap-1">
              PICKTOMES <span className="text-amber-600 text-xs font-bold font-sans tracking-widest block sm:inline">| SCRIPTORIUM</span>
            </span>
            <span className="text-[9px] font-extrabold tracking-widest text-slate-500 uppercase mt-0.5">Rare Literature & Digital Vault</span>
          </div>
        </Link>

        {/* Live Search Bar */}
        <div className="relative hidden lg:block w-80 xl:w-96" ref={searchRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search manuscripts, authors, topics..."
              value={searchQuery}
              onFocus={handleSearchFocus}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 text-xs bg-slate-100 text-slate-800 rounded-full border border-slate-200 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-400 font-semibold"
            />
            {searchQuery ? (
              <button onClick={() => setSearchQuery("")} className="absolute right-10 p-1 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button className="absolute right-1 w-8 h-8 rounded-full bg-[#0F172A] hover:bg-amber-600 text-white flex items-center justify-center transition-colors shadow-xs">
              <Search className="w-4 h-4 text-amber-300 font-bold" />
            </button>
          </div>

          {/* Live Search Results */}
          {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 font-sans">
              {isLoadingBooks ? (
                <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600" /> Searching library catalog...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-700 border-b border-slate-100 flex items-center justify-between">
                    <span>Search Matches ({searchResults.length})</span>
                    <Sparkles className="w-3 h-3 text-amber-600" />
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
                        <div className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-700">
                          {book.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">by {book.author}</div>
                      </div>
                      <span className="text-xs font-black text-amber-700 whitespace-nowrap">{book.price || "$1.99"}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">No matching books found.</div>
              )}
            </div>
          )}
        </div>

        {/* Nav Items & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-6 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-amber-600 transition-colors py-1 ${
                  pathname === item.href ? "text-amber-700 font-black border-b-2 border-amber-600" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/cart"
            className="bg-[#0F172A] hover:bg-slate-800 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-md hover:scale-105"
          >
            <ShoppingCart className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span className="hidden sm:inline font-bold">My Cart</span>
            {isMounted && (
              <span className="bg-amber-500 text-[#0F172A] text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 font-sans shadow-lg animate-in slide-in-from-top-2">
          <div className="relative flex items-center mb-4">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 text-xs bg-slate-100 text-slate-800 rounded-xl border border-slate-200 focus:border-amber-600 focus:outline-none"
            />
            <Search className="absolute right-3 w-4 h-4 text-slate-400" />
          </div>
          <div className="flex flex-col space-y-3 text-xs font-bold uppercase tracking-wider text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  pathname === item.href ? "bg-amber-50 text-amber-700 border border-amber-200" : "hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}



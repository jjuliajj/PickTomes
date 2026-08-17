import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signature Library Vault & Digital Archives | PickTomes",
  description: "Browse our complete digital library catalog of EPUB e-books and literature collections.",
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ genre?: string; category?: string }> }) {
  const params = await searchParams;
  const targetCategory = params.category || params.genre;
  const books = await getBooks();
  
  const filteredBooks = targetCategory 
    ? books.filter(b => b.category && b.category.toLowerCase() === targetCategory.toLowerCase())
    : books;

  return (
    <main className="flex min-h-screen flex-col bg-[#FBF9F5] font-sans text-slate-900">
      <Navbar />

      <section className="pt-36 pb-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-md text-left space-y-4 relative overflow-hidden">
            <span className="text-amber-900 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-700" /> CURATED DIGITAL CATALOGUE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] font-cormorant leading-tight">
              The Complete <span className="text-amber-700 italic">Scriptorium Catalogue</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-2xl leading-relaxed">
              Explore our full library of verified EPUB e-books spanning fiction classics, philosophy monographs, self-help, and academic research.
            </p>

            <div className="flex items-center gap-6 pt-4 text-xs font-bold text-slate-600 border-t border-slate-100">
              <span>📚 <strong>{filteredBooks.length}</strong> Volumes Available</span>
              <span>⚡ <strong>100% DRM-Free</strong> EPUB</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                price={book.price}
                category={book.category}
                image={book.cover_url}
                description={book.description}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}


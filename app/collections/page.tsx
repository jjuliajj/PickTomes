import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import { Flame } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tủ Sách Nổi Bật | Fahasa PickTomes Hub",
  description: "Duyệt toàn bộ kho sách văn học, kinh tế, triết học và kỹ năng sống.",
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ genre?: string; category?: string }> }) {
  const params = await searchParams;
  const targetCategory = params.category || params.genre;
  const books = await getBooks();
  
  const filteredBooks = targetCategory 
    ? books.filter(b => b.category && b.category.toLowerCase() === targetCategory.toLowerCase())
    : books;

  const categories = Array.from(new Set(filteredBooks.map((b) => b.category).filter(Boolean)));

  return (
    <main className="flex min-h-screen flex-col bg-[#F0F2F5]">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
          
          <header className="mb-12 text-center max-w-3xl mx-auto space-y-3 font-sans">
            <span className="text-[#C92127] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
              <Flame className="w-4 h-4 fill-[#C92127]" /> TỦ SÁCH FAHASA NỔI BẬT
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-800">
              Bộ Sưu Tập Sách Bản Quyền
            </h1>
            <p className="text-sm text-slate-600 font-semibold leading-relaxed">
              Khám phá toàn bộ các tác phẩm bán chạy, sách mới và các tuyển tập tri thức đặc sắc.
            </p>
          </header>

          <div className="space-y-16">
            {categories.map((category) => {
              const categoryBooks = filteredBooks.filter((b) => b.category === category);
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 font-sans">
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                      <span className="w-3 h-6 bg-[#C92127] rounded-sm block" />
                      {category}
                    </h2>
                    <span className="font-bold text-xs text-[#C92127] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      {categoryBooks.length} Tác Phẩm
                    </span>
                  </div>

                  {/* 4-Column Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryBooks.map((book) => (
                      <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

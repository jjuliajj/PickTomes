import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryExplorer from "@/components/CategoryExplorer";
import { getBooks } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh Mục Thể Loại Sách | Fahasa PickTomes Hub",
  description: "Khám phá các thể loại sách văn học, kinh tế, triết học và kỹ năng bán chạy nhất.",
};

export default async function GenresPage() {
  const books = await getBooks();

  return (
    <main className="flex min-h-screen flex-col bg-[#F0F2F5]">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
          <CategoryExplorer initialBooks={books} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryExplorer from "@/components/CategoryExplorer";
import { getBooks } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Categories & Disciplines | PickTomes Digital Vault",
  description: "Browse curated e-books categorized by philosophy, non-fiction, fiction, and self-help classics.",
};

export default async function GenresPage() {
  const books = await getBooks();

  return (
    <main className="flex min-h-screen flex-col bg-[#F4F6F8]">
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
